import { pgTable, text } from "drizzle-orm/pg-core";
import { v7 } from "uuid";

export const game = pgTable("game", {
	id: text("id")
		.primaryKey()
		.$default(() => v7()),
	title: text("title").notNull(),
	description: text("description"),
	imageUrl: text("image_url").notNull(),
	tier: text("tier").notNull(),
	genre: text("genre").notNull(),
});
