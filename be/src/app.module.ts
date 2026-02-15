import { AuthGuard, AuthModule } from "@mguay/nestjs-better-auth";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import * as bcryptjs from "bcryptjs";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DATABASE_CONNECTION } from "./database/connection";
import { DatabaseModule } from "./database/database.module";
import { SubscriptionsModule } from "./subscriptions/subscriptions.module";
import { UsersModule } from "./users/users.module";
import { GamesModule } from './games/games.module';

@Module({
	imports: [
		UsersModule,
		SubscriptionsModule,
		ConfigModule.forRoot(),
		AuthModule.forRootAsync({
			imports: [DatabaseModule],
			useFactory: (database: NodePgDatabase) => ({
				auth: betterAuth({
					database: drizzleAdapter(database, {
						provider: "pg",
					}),
					trustedOrigins: ["http://localhost:5173"],
					emailAndPassword: {
						enabled: true,
						password: {
							hash: (password: string) => bcryptjs.hash(password, 8),
							verify: ({ password, hash }) =>
								bcryptjs.compare(password, hash),
						},
					},
					advanced: {
						database: {
							generateId: false,
						},
					},
					session: {
						expiresIn: 60 * 60 * 24 * 3, // 7 days
						cookieCache: {
							enabled: true,
							maxAge: 60 * 5,
						},
					},
				}),
			}),
			inject: [DATABASE_CONNECTION],
		}),
		GamesModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AppModule {}
