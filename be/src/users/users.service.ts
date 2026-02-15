import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { schema } from "src/database/schema";
import { supabase } from "src/lib/supabase";

@Injectable()
export class UsersService {
	async getAllUsers() {
		const result = await supabase.select().from(schema.user);
		return result;
	}

   async updateUsername(userId: string, newUsername: string) {

      const formattedTrimNewUsername = newUsername.trim();

      const newUser = await supabase
         .update(schema.user)
         .set({ name: formattedTrimNewUsername })
         .where(eq(schema.user.id, userId))
         .returning();

      // console.log(newUser);
      return newUser;
   }

   async getUsername(userId: string) {

      const user = await supabase
         .select({
            name: schema.user.name
         })
         .from(schema.user)
         .where(eq(schema.user.id, userId))

      return user;

   }


}
