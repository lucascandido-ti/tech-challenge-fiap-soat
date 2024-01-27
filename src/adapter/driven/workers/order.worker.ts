import { Cron, CronExpression } from '@nestjs/schedule';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { OrderStatus, PaymentStatus } from '@/core/domain/enums';
import { IOrderRepositoryPort } from '@/core/domain/repositories';

import { formatDateTime } from '@/utils';

import { ORDER_REPOSITORY } from '@/config';

@Injectable()
export class OrderWorker implements OnModuleInit {
  private readonly logger = new Logger(OrderWorker.name);
  private isRunning = false;

  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly _orderRepository: IOrderRepositoryPort,
  ) {}

  onModuleInit() {
    this.logger.log(`Creating CRON ${OrderWorker.name}: (${CronExpression.EVERY_MINUTE})`);
  }

  @Cron('*/2 * * * *')
  async handleCron() {
    if (this.isRunning) return;
    this.isRunning = true;

    this.logger.log(`Started Job: ${OrderWorker.name} -> ${formatDateTime(new Date())}`);

    try {
      const { data } = await this._orderRepository.getOrderBy({
        status: OrderStatus.RECEIVED,
        paymentStatus: PaymentStatus.CONCLUDED,
      });

      const promiseOrders = data.map(({ id }) =>
        this._orderRepository.updateOrderStatus(id, OrderStatus.IN_PREPARATION),
      );
      await Promise.all(promiseOrders);
    } catch (error: any) {
      this.isRunning = false;
      this.logger.log(
        `Failed Job: ${OrderWorker.name} -> ${formatDateTime(new Date())}\nError: ${error.stack}`,
      );
    } finally {
      this.isRunning = false;
      this.logger.log(`Finished Job: ${OrderWorker.name} -> ${formatDateTime(new Date())}`);
    }
  }
}
