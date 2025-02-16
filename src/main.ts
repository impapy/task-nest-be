import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); // Cast app as NestExpressApplication

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Removes properties that do not have decorators
      forbidNonWhitelisted: true, // Throws an error when non-whitelisted properties are found
    }),
  );

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
