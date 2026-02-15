import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "src/env";
import { DATABASE_CONNECTION } from "./connection";
import { schema } from "./schema/index";

@Module({
	imports: [ConfigModule],
	controllers: [],
	providers: [
		{
			provide: DATABASE_CONNECTION,
			useFactory() {
				const pool = new Pool({
					connectionString: env.DATABASE_URL,
				});
				return drizzle(pool, {
					schema,
					casing: "snake_case",
				});
			},
		},
	],
	exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
