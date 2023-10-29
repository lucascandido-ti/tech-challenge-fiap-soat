import { PAYMENT_REPOSITORY } from '@/config';
import { CreatePaymentDTO } from '@/core/domain/dto';
import { Payment } from '@/core/domain/entities';
import { IPayment, IPaymentUseCase } from '@/core/domain/interfaces';
import { IPaymentRepositoryPort } from '@/core/domain/repositories';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class PaymentUseCase implements IPaymentUseCase {
  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly _paymentRepository: IPaymentRepositoryPort,
  ) {}

  async findAll(): Promise<IPayment[]> {
    return this._paymentRepository.findAll();
  }

  async createPayment({ order, paymentMethod }: CreatePaymentDTO): Promise<Payment> {
    const payment = Payment.create({ order: order, paymentMethod });

    return this._paymentRepository.insert(payment);
  }
}
