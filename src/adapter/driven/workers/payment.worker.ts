import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PaymentWorker implements OnModuleInit {
  private readonly logger = new Logger(PaymentWorker.name);
  private isRunning = false;

  onModuleInit() {
    this.logger.log(`Creating CRON ${PaymentWorker.name}: (${CronExpression.EVERY_MINUTE})`);
  }

  @Cron(CronExpression.EVERY_MINUTE)
  handleCron() {
    if (this.isRunning) return;

    try {
      this.logger.log(`Hello, Worker: ${PaymentWorker.name}`);
    } catch (error) {
      this.isRunning = false;
    } finally {
      this.isRunning = false;
    }
  }
}
