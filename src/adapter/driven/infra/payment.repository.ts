import { POSTGRES_DATA_SOURCE } from '@/config';
import { Payment } from '@/core/domain/entities';
import { paymentStatusDict } from '@/core/domain/enums';
import { IPayment } from '@/core/domain/interfaces';
import { IPaymentRepositoryPort } from '@/core/domain/repositories';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class PaymentRepository implements IPaymentRepositoryPort {
  constructor(
    @InjectRepository(Payment, POSTGRES_DATA_SOURCE)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async getStatus(
    paymentId: number,
  ): Promise<Pick<Payment, 'id' | 'createdAt'> & Record<string, unknown>> {
    const payment = await this.paymentRepository.findOneBy({ id: paymentId });
    if (!payment) throw new Error('Payment not found');

    const newPayment: Pick<Payment, 'id' | 'createdAt'> & Record<string, unknown> = {
      id: payment.id,
      paymentStatus: String(paymentStatusDict[payment.paymentStatus]),
      createdAt: payment.createdAt,
    };

    return newPayment;
  }

  async getPaymentByOrder(orderId: number, customerId: number): Promise<IPayment> {
    const payment = await this.paymentRepository
      .createQueryBuilder('payment')
      .innerJoinAndSelect('payment.order', 'order')
      .innerJoinAndSelect('order.customer', 'customer')
      .innerJoinAndSelect('order.products', 'products')
      .where('order.id = :orderId', { orderId: orderId })
      .andWhere('customer.id = :customerId', { customerId: customerId })
      .getOne();

    if (!payment) throw new Error(`Payment not found`);

    return payment;
  }

  async insert(entity: Payment): Promise<Payment> {
    const payment = this.paymentRepository.create(entity);
    return this.paymentRepository.save(payment);
  }

  async findOneById(id: string | number): Promise<Payment> {
    const payment = await this.paymentRepository
      .createQueryBuilder('payment')
      .innerJoinAndSelect('payment.order', 'order')
      .innerJoinAndSelect('order.customer', 'customer')
      .innerJoinAndSelect('order.products', 'products')
      .where('payment.id = :paymentId', { paymentId: id })
      .getOne();

    return payment;
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentRepository.createQueryBuilder('payment').getMany();
  }
}
