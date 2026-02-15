import { Controller, Get, Param } from '@nestjs/common';
import { GamesService } from './games.service';
import { Public } from '@mguay/nestjs-better-auth';

@Controller('games')
export class GamesController {
   constructor(
      private readonly gamesService: GamesService
   ) {}

   @Public()
   @Get()
   async getGames() {
      return await this.gamesService.getGames()
   }

   @Get('plan/:userPlan')
   async getGamesPlan(
      @Param('userPlan') userPlan: string
   ) {
      return await this.gamesService.getGamesPlan({ plan: userPlan })
   }

   @Public()
   @Get("check")
	healthCheckGames() {
		return "All ok!";
	}
}
