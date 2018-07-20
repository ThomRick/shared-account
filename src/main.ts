import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
(async () => {
  const application = await NestFactory.create(AppModule);
  await application.listen(process.env.PORT || 8080);
})();
