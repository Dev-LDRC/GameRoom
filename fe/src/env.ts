import z from "zod";

const envSchema = z.object({
	BACKEND_URL: z.coerce.string().default("http://localhost:4444"),
	SUPABASE_URL: z.string(),
	SUPABASE_ANON_KEY: z.string()
});

export const env = envSchema.parse(import.meta.env);
