import { AuthGuard, Public, Session, UserSession } from "@mguay/nestjs-better-auth";
import { Controller, Get, Patch, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
@UseGuards(AuthGuard)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	// @Get("session")
	// async getSession(@Session() session: UserSession) {
	// 	return session;
	// }

	// @Get("all")
	// async get_all_users() {
	// 	const get_all_users = await this.usersService.getAllUsers();
	// 	return get_all_users;
	// }

   @Public()
   @Get("check")
   healthCheckUsers() {
      return "All ok!";
   }

   @Get("username")
   async getUsername(@Session() sessionUser: UserSession) {
      // console.log("Session data:", sessionUser);
      const result = await this.usersService.getUsername(sessionUser.session.userId);
      return result;
   }

   @Patch()
   async updateUsername(@Session() sessionUser: UserSession, @Req() request: any) {
      // console.log("Request body:", request.body);
      // console.log("Session data:", sessionUser);
      const result = await this.usersService.updateUsername(sessionUser.session.userId, request.body.newUsername);
      return result;
   }
}
