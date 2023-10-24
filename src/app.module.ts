import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { throttlerModuleOptions } from './config/api.config';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from './config';
import { ThrottlerModule } from '@nestjs/throttler';
import { postgresTypeOrmModuleOptions } from './config/db';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    ThrottlerModule.forRootAsync(throttlerModuleOptions),
    TypeOrmModule.forRootAsync(postgresTypeOrmModuleOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
