import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common';

import { ORDER_USECASE } from '@/config';
import { ApiOperationWithParams } from '@/core/domain/decorators';
import { IOrder, IOrderUseCase } from '@/core/domain/interfaces';

@Controller('/order')
export class OrderController {
  constructor(
    @Inject(ORDER_USECASE)
    private readonly _orderUseCase: IOrderUseCase,
  ) {}

  @ApiOperationWithParams({
    summary: 'View Order',
    responseDescription: 'List Order',
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getOrders(): Promise<IOrder[]> {
    return this._orderUseCase.findAll();
  }
}
