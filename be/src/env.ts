import "dotenv/config";
import z from "zod";

const envSchema = z.object({
	PORT: z.coerce.number().default(4444),
	DATABASE_URL: z.url().startsWith("postgresql://"),
	STRIPE_WEBHOOK: z.string(),
	STRIPE_PUBLIC_KEY: z.string(),
	STRIPE_SECRET_KEY: z.string(),
	STRIPE_BASIC_PLAN_PRICE_ID: z.string(),
	STRIPE_PREMIUM_PLAN_PRICE_ID: z.string(),
	STRIPE_ULTIMATE_PLAN_PRICE_ID: z.string()
});

export const env = envSchema.parse(process.env);
