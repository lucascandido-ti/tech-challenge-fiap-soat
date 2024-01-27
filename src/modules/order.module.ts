import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';

import {
  OrderWorker,
  CustomerRepository,
  OrderRepository,
  PaymentRepository,
  ProductRepository,
} from '@/adapter/driven';
import { OrderController } from '@/adapter/driver';

import { OrderUseCase } from '@/core/application/order';
import { PaymentUseCase } from '@/core/application/payment';

import { Customer, Order, Payment, Product } from '@/core/domain/entities';

import {
  CUSTOMER_REPOSITORY,
  ORDER_REPOSITORY,
  ORDER_USECASE,
  PAYMENT_REPOSITORY,
  PAYMENT_USECASE,
  POSTGRES_DATA_SOURCE,
  PRODUCT_REPOSITORY,
} from '@/config';

const httpControllers = [OrderController];
const handlers: Provider[] = [OrderUseCase, OrderWorker];
const repositories: Provider[] = [
  { provide: CUSTOMER_REPOSITORY, useClass: CustomerRepository },
  { provide: ORDER_REPOSITORY, useClass: OrderRepository },

  { provide: PRODUCT_REPOSITORY, useClass: ProductRepository },
  { provide: PAYMENT_REPOSITORY, useClass: PaymentRepository },

  { provide: ORDER_USECASE, useClass: OrderUseCase },
  { provide: PAYMENT_USECASE, useClass: PaymentUseCase },
];

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, Customer, Payment], POSTGRES_DATA_SOURCE)],
  controllers: [...httpControllers],
  providers: [...handlers, ...repositories],
})
export class OrderModule {}
