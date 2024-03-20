import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';

import { CustomerRepository } from '@/adapter/driven';
import { CustomerController } from '@/adapter/driver/controllers';

import { CUSTOMER_USECASE, CUSTOMER_REPOSITORY, POSTGRES_DATA_SOURCE } from '@/config';

import { Customer } from '@/core/domain/entities';
import { CustomerUseCase } from '@/core/application';

const httpControllers = [CustomerController];
const handlers: Provider[] = [CustomerUseCase];
const repositories: Provider[] = [
  { provide: CUSTOMER_REPOSITORY, useClass: CustomerRepository },
  { provide: CUSTOMER_USECASE, useClass: CustomerUseCase },
];

@Module({
  imports: [TypeOrmModule.forFeature([Customer], POSTGRES_DATA_SOURCE)],
  controllers: [...httpControllers],
  providers: [...handlers, ...repositories],
})
export class CustomerModule {}
