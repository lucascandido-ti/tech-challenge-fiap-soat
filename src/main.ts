import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';

import { Config } from './config';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Tech Challenge - FIAP SOAT - Lanchonete')
    .setDescription(
      'Projeto de um Sistema para Lanchonete como Componente da Pós-Graduação em Arquitetura de Software',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const config = (configService as unknown as { internalConfig: Config }).internalConfig;

  app.enable('trust proxy');
  app.setGlobalPrefix(config.api.prefix);
  app.enableCors({ credentials: true });
  app.enableShutdownHooks();

  await app.listen(+config.api.port);
}
bootstrap();
