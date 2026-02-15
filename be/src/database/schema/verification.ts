import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { v7 } from "uuid";

export const verification = pgTable("verification", {
	id: text("id")
		.primaryKey()
		.$default(() => v7()),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
});
