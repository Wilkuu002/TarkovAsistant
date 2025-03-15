import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Tarkov Assistant API')
    .setDescription('API for managing Tarkov Assistant')
    .setVersion('1.0')
    .addTag('auth')
    .addBearerAuth()
    .build();
    

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
