import { NestFactory } from "@nestjs/core";
import { raw } from "express";
import { AppModule } from "./app.module";
import { env } from "./env";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		bodyParser: false, // Required for Better Auth
	});

   app.enableCors({
      origin: 'http://localhost:5173', // ou a porta do seu frontend
      credentials: true,
   });

	app.use("/subscriptions/webhooks/stripe", raw({ type: "application/json" }));

	await app.listen(env.PORT);
}
bootstrap();
