import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';

import { Config } from './config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  const config = (configService as unknown as { internalConfig: Config }).internalConfig;

  app.enable('trust proxy');
  app.setGlobalPrefix(config.api.prefix);
  app.enableCors({ credentials: true });
  app.enableShutdownHooks();

  await app.listen(+config.api.port);
}
bootstrap();
