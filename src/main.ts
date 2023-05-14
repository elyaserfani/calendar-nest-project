import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomValidationPipe } from './pipes/custom.validation.pipe';
import { CustomExceptionFilter } from './filters/custom.exception.filter';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Calendar Project Backend')
    .setDescription(
      '<h3>' +
        'Calendar ' +
        '<u>Event Based</u>' +
        ' Project APIs Documentation' +
        '</h3>',
    )
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
