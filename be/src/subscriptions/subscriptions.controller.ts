import { Controller, Get, Param, Post, Req } from "@nestjs/common";
import { SubscriptionsService } from "./subscriptions.service";
import { Public } from "@mguay/nestjs-better-auth";
import {
   BadRequestException,
   Headers,
   HttpCode,
   HttpStatus,
} from "@nestjs/common";

@Controller("subscriptions")
export class SubscriptionsController {
	constructor(private readonly subscriptionsService: SubscriptionsService) {}

	@Post("cancel-subscription")
	cancelSubscription(@Req() request: any) {
		return this.subscriptionsService.cancelSubscription(request);
	}

   @Get("user-plan/:id")
   getUserPlan(@Param('id') userId: string) {
      return this.subscriptionsService.getUserPlan(userId);
   }

   @Post("create-subscription")
	createSubscription(@Req() request: any) {
		return this.subscriptionsService.createSubscription(request);
	}

	@Public()
	@Post("webhooks/stripe")
	@HttpCode(HttpStatus.OK)
	async webhookPayment(
		@Req() request: any,
		@Headers("stripe-signature") signature: string,
	) {
		if (!signature) {
			throw new BadRequestException("Missing stripe-signature header");
		}

		try {
			const rawBody = request.body;
			if (!rawBody) {
				throw new BadRequestException("Missing raw body");
			}
			const result = await this.subscriptionsService.subscriptionWebhook(
				rawBody,
				signature,
			);
			// console.log(result);
			return result;
		} catch (error) {
			console.error("Webhook error:", error.message);
			throw new BadRequestException(`Webhook error: ${error.message}`);
		}
	}

	@Public()
	@Get("check")
	healthCheckSubscriptions() {
		return "All ok!";
	}
}
