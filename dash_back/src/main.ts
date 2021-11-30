import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config';
import * as requestIp from 'request-ip';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(requestIp.mw());

  const config = new DocumentBuilder()
    .setTitle('Dashboard API Documentation')
    .setDescription(
      'This document describes requests payload and responses of the API endpoints',
    )
    .setVersion('1.0')
    .addTag('widgets')
    .addTag('services')
    .addTag('auth')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);

  await app.listen(PORT);
}
bootstrap();
