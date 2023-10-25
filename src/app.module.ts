import { CustomerModule } from './modules/customer.module';
import { Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';

import {
  configModuleOptions,
  throttlerModuleOptions,
  postgresTypeOrmModuleOptions,
} from './config';

const httpControllers = [];
const repositories: Provider[] = [];

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    ThrottlerModule.forRootAsync(throttlerModuleOptions),
    TypeOrmModule.forRootAsync(postgresTypeOrmModuleOptions),
    CustomerModule,
  ],
  controllers: [...httpControllers],
  providers: [...repositories],
})
export class AppModule {}
