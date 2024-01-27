import { Cron, CronExpression } from '@nestjs/schedule';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { PaymentStatus } from '@/core/domain/enums';
import { IPaymentRepositoryPort } from '@/core/domain/repositories';

import { PAYMENT_REPOSITORY } from '@/config';

@Injectable()
export class PaymentWorker implements OnModuleInit {
  private readonly logger = new Logger(PaymentWorker.name);
  private isRunning = false;

  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly _paymentRepository: IPaymentRepositoryPort,
  ) {}

  onModuleInit() {
    this.logger.log(`Creating CRON ${PaymentWorker.name}: (${CronExpression.EVERY_MINUTE})`);
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    if (this.isRunning) return;

    this.logger.log(`Started Job: ${PaymentWorker.name} -> ${new Date()}`);

    try {
      const { data } = await this._paymentRepository.getPaymentBy({
        status: PaymentStatus.PENDING,
      });

      const promisePayments = data.map(({ id }) => this._paymentRepository.updatePaymentStatus(id));
      const payments = await Promise.all(promisePayments);

      payments.map(({ id, paymentStatus }) => console.log(`ID: ${id}, Status: ${paymentStatus}`));
    } catch (error: any) {
      this.isRunning = false;
      this.logger.log(`Failed Job: ${PaymentWorker.name} -> ${new Date()} - Error: ${error.stack}`);
    } finally {
      this.isRunning = false;
      this.logger.log(`Finished Job: ${PaymentWorker.name} -> ${new Date()}`);
    }
  }
}
