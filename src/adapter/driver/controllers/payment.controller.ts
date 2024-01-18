import { PAYMENT_USECASE } from '@/config';
import { IPayment, IPaymentUseCase } from '@/core/domain/interfaces';
import { Controller, Get, Inject } from '@nestjs/common';

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
}
