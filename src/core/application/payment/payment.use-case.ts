import { ORDER_REPOSITORY, PAYMENT_REPOSITORY } from '@/config';
import { CreatePaymentDTO } from '@/core/domain/dto';
import { Payment } from '@/core/domain/entities';
import { IPayment, IPaymentUseCase } from '@/core/domain/interfaces';
import { IOrderRepositoryPort, IPaymentRepositoryPort } from '@/core/domain/repositories';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class PaymentUseCase implements IPaymentUseCase {
  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly _paymentRepository: IPaymentRepositoryPort,
    @Inject(ORDER_REPOSITORY)
    private readonly _orderRepository: IOrderRepositoryPort,
  ) {}

  async findAll(): Promise<IPayment[]> {
    return this._paymentRepository.findAll();
  }

  async createPayment({ order, paymentMethod }: CreatePaymentDTO): Promise<Payment> {
    const orderFound = await this._orderRepository.findOneById(order.id);

    const payment = Payment.create({ order: orderFound, paymentMethod });

    return this._paymentRepository.insert(payment);
  }
}
