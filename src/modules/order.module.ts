import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';

import { OrderRepository } from '@/adapter/driven/infra';
import { ORDER_REPOSITORY, ORDER_USECASE, POSTGRES_DATA_SOURCE } from '@/config';

import { Order } from '@/core/domain/entities';
import { OrderUseCase } from '@/core/application/order';

import { OrderController } from './../adapter/driver/controllers';

const httpControllers = [OrderController];
const handlers: Provider[] = [OrderUseCase];
const repositories: Provider[] = [
  { provide: ORDER_REPOSITORY, useClass: OrderRepository },
  { provide: ORDER_USECASE, useClass: OrderUseCase },
];

@Module({
  imports: [TypeOrmModule.forFeature([Order], POSTGRES_DATA_SOURCE)],
  controllers: [...httpControllers],
  providers: [...handlers, ...repositories],
})
export class OrderModule {}
