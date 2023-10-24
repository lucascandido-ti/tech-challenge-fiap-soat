import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';

import {
  configModuleOptions,
  throttlerModuleOptions,
  postgresTypeOrmModuleOptions,
} from './config';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    ThrottlerModule.forRootAsync(throttlerModuleOptions),
    TypeOrmModule.forRootAsync(postgresTypeOrmModuleOptions),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
