import { Inject, Injectable } from '@nestjs/common';

import { IOrder, IOrderUseCase } from '@/core/domain/interfaces';
import { IOrderRepositoryPort } from '@/core/domain/repositories';
import { ORDER_REPOSITORY } from '@/config';

@Injectable()
export class OrderUseCase implements IOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly _orderRepository: IOrderRepositoryPort,
  ) {}

  async findAll(): Promise<IOrder[]> {
    return await this._orderRepository.findAll();
  }
}
