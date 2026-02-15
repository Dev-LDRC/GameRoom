import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { v7 } from "uuid";
import { subscription } from "./subscription";

export const user = pgTable("user", {
	id: text("id")
		.primaryKey()
		.$default(() => v7()),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	image: text("image"),
	currentSubscriptionId: text("current_subscription_id").references(
		() => subscription.id,
	),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
});
