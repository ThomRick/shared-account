import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export const startWebServer = async () => {
  const application: INestApplication = await NestFactory.create(AppModule);
  await application.listen(8080);
};