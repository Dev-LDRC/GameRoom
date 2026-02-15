import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { v7 } from "uuid";
import { user } from "./user";

export const subscription = pgTable("subscription", {
	id: text("id")
		.primaryKey()
		.$default(() => v7()),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	plan: text("plan").notNull(),
	startedAt: timestamp("started_at").notNull(),
	status: text("status").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
});
