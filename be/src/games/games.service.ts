import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { schema } from 'src/database/schema';
import { supabase } from 'src/lib/supabase';

@Injectable()
export class GamesService {
   async getGames() {
      try {
         const res = await supabase
            .select()
            .from(schema.game)
         return res;
      } catch (error) {
         console.error("Error fetching games:", error);
         throw new Error("Failed to fetch games");
      }
   }

   async getGamesPlan(userPlan: any) {
      const res = await supabase
         .select()
         .from(schema.game)
         .where(eq(schema.game.tier, userPlan.plan))
      return res;
   }
}
