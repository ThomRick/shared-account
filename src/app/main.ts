import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export const startApiServer = async () => {
  const application = await NestFactory.create(AppModule);
  await application.listen(8081);
};
