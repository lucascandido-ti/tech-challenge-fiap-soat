import { PAYMENT_USECASE } from '@/config';
import { IPayment, IPaymentUseCase } from '@/core/domain/interfaces';

import { Controller, Get, Inject, Param, Sse, MessageEvent } from '@nestjs/common';
import { Observable, defer, map, repeat } from 'rxjs';

@Controller('payment')
export class PaymentController {
  constructor(
    @Inject(PAYMENT_USECASE)
    private readonly paymentUseCase: IPaymentUseCase,
  ) {}

  @Sse(':id/events')
  sendEvent(@Param('id') id: number): Observable<MessageEvent> {
    return defer(() => this.paymentUseCase.getPaymentStatus(id)).pipe(
      repeat({
        delay: 1000,
      }),
      map(report => ({
        type: 'message',
        data: report,
      })),
    );
  }

  @Get()
  async findAll(): Promise<IPayment[]> {
    return this.paymentUseCase.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<IPayment> {
    return this.paymentUseCase.findById(id);
  }

  @Get('/order/:orderId/:customerId')
  async getPaymentByOrder(
    @Param('orderId') orderId: number,
    @Param('customerId') customerId: number,
  ): Promise<IPayment> {
    return this.paymentUseCase.getPaymentByOrder(orderId, customerId);
  }
}
