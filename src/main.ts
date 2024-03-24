import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('TechTicket API')
    .setDescription('API for managing IT support tickets')
    .setVersion('1.0')
    .addTag('tickets', 'Endpoints related to ticket management')
    .addTag('auth', 'Endpoints for user authentication')
    .build();
  app.useLogger(app.get(Logger));
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
