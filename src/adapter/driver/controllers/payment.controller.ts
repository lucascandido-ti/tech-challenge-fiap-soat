import { PAYMENT_USECASE } from '@/config';
import { IPayment, IPaymentUseCase } from '@/core/domain/interfaces';
import { Controller, Get, Inject, Param } from '@nestjs/common';

@Controller('payment')
export class PaymentController {
  constructor(
    @Inject(PAYMENT_USECASE)
    private readonly paymentUseCase: IPaymentUseCase,
  ) {}

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
