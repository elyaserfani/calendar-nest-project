import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
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
  await app.listen(3000);
}
bootstrap();
