import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomValidationPipe } from './pipe/custom.validation.pipe';
import { CustomExceptionFilter } from './filter/custom.exception.filter';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Calendar Project Backend')
    .setDescription('Calendar Event Based Project APIs Documentation')
    .addBearerAuth()
    .setContact('Elyas Erfani', null, 'elyaserfani2@gmail.com')
    .setVersion('1.0.0')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, swaggerDocument);
  app.useGlobalPipes(
    new CustomValidationPipe({ whitelist: true, stopAtFirstError: true }),
  );
  app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(3000);
}
bootstrap();
