import { drizzle } from "drizzle-orm/postgres-js";
import { env } from "src/env";

export const supabase = drizzle(env.DATABASE_URL);
