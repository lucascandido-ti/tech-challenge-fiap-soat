import { CustomerController } from './adapter/driver/controllers/customer.controller';
import { Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';

import { CustomerRepository } from './adapter/driven';

import {
  configModuleOptions,
  throttlerModuleOptions,
  postgresTypeOrmModuleOptions,
} from './config';

import { CUSTOMER_REPOSITORY, CUSTOMER_USECASE } from './config/dependecy-injection';

import { CustomerUseCase } from './core/application';

const httpControllers = [CustomerController];
const repositories: Provider[] = [
  { provide: CUSTOMER_REPOSITORY, useClass: CustomerRepository },
  { provide: CUSTOMER_USECASE, useClass: CustomerUseCase },
];

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    ThrottlerModule.forRootAsync(throttlerModuleOptions),
    TypeOrmModule.forRootAsync(postgresTypeOrmModuleOptions),
  ],
  controllers: [...httpControllers],
  providers: [...repositories],
})
export class AppModule {}
