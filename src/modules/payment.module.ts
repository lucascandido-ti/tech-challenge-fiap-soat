import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PAYMENT_REPOSITORY, PAYMENT_USECASE, POSTGRES_DATA_SOURCE } from '@/config';

import { PaymentController } from '@/adapter/driver';
import { PaymentRepository, PaymentWorker } from '@/adapter/driven';

import { PaymentUseCase } from '@/core/application';
import { Order, Payment } from '@/core/domain/entities';

const httpControllers = [PaymentController];
const handlers: Provider[] = [PaymentUseCase, PaymentWorker];
const repositories: Provider[] = [
  { provide: PAYMENT_REPOSITORY, useClass: PaymentRepository },
  { provide: PAYMENT_USECASE, useClass: PaymentUseCase },
];

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Order], POSTGRES_DATA_SOURCE)],
  controllers: [...httpControllers],
  providers: [...handlers, ...repositories],
})
export class PaymentModule {}
