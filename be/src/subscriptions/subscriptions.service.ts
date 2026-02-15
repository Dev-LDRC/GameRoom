import { Injectable, NotFoundException } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { schema } from "src/database/schema";
import { env } from "src/env";
import { stripe } from "src/lib/stripe";
import { supabase } from "src/lib/supabase";
import Stripe from "stripe";

@Injectable()
export class SubscriptionsService {
	async cancelSubscription(req: any) {
		// console.log(req.body);

		if (!req.body.id) {
			throw new Error("User ID is required");
		}

		const res = await supabase
			.delete(schema.subscription)
			.where(eq(schema.subscription.userId, req.body.id))
			.returning();
		return res;
	}

   async getUserPlan(userId: string) {

      if (!userId) {
			throw new Error("Id is required");
		}

      const res = await supabase
         .select()
         .from(schema.subscription)
         .where(eq(schema.subscription.userId, userId))

      return res;
   }

   ///////////////////

   async createSubscriptionDatabase(datasSubscription) {
      const res = await supabase.insert(schema.subscription).values({
         userId: datasSubscription.metadata.userId,
         status: "active",
         plan: datasSubscription.metadata.plan,
         startedAt: new Date(datasSubscription.created),
      });
      return res;
   }

   private async checkIsUser(emailUser) {
      const search = await supabase
         .select()
         .from(schema.user)
         .where(eq(schema.user.email, emailUser));

      // console.log(search);
      return search;
   }

   private getPriceId(planName: string): string {
      switch (planName) {
         case "Basic":
            return env.STRIPE_BASIC_PLAN_PRICE_ID; // Replace with your actual price ID for the basic plan
         case "Premium":
            return env.STRIPE_PREMIUM_PLAN_PRICE_ID;
         case "Ultimate":
            return env.STRIPE_ULTIMATE_PLAN_PRICE_ID;
         default:
            throw new Error("Invalid plan name");
      }
   }

   async createSubscription(req: any) {
      const check_user = await this.checkIsUser(req.body.email_user);

      if (check_user.length < 1) {
         throw new NotFoundException("Usuario não encontrado.");
      }

      const subscription_price_id = this.getPriceId(req.body.plan);

      const session = await stripe.checkout.sessions.create({
         success_url: "http://localhost:5173/game-room",
         cancel_url: "http://localhost:5173/",
         line_items: [
            {
               price: subscription_price_id,
               quantity: 1,
            },
         ],
         mode: "subscription",
         subscription_data: {
            metadata: {
               userId: check_user[0].id,
               plan: req.body.plan,
            },
         },
      });

      return session;
   }

   async subscriptionWebhook(rawBody: Buffer, signature: string) {
      const webhookSecret = env.STRIPE_WEBHOOK;

      let event;
      try {
         event = stripe.webhooks.constructEvent(
            rawBody,
            signature,
            webhookSecret,
         );
      } catch (err) {
         throw new Error(
            `Webhook signature verification failed: ${err.message}`,
         );
      }

      switch (event.type) {
         case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;
            const subscriptionId = session.subscription as string;

            console.log("--------------------");
            console.log(event.data);
            console.log("--------------------");
            const subscription =
               await stripe.subscriptions.retrieve(subscriptionId);
            console.log(subscription);
            console.log("--------------------");

            const result = await this.createSubscriptionDatabase(subscription);
            console.log(result);
            break;
         }

         case "checkout.session.expired":
            if (event.data.object.payment_status === "unpaid") {
               // O cliente saiu do checkout e expirou :(
               const testeId = event.data.object.id;
               console.log("checkout expirado", testeId);
            }
            break;

         default:
            console.log(`Evento não tratado: ${event.type}`);
      }

      return { result: event, ok: true };
   }
}
