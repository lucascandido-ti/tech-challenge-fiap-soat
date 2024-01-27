import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Payment } from '@/core/domain/entities';
import { GetPaymentDTO } from '@/core/domain/dto';
import { PaymentStatus } from '@/core/domain/enums';
import { IPaymentRepositoryPort } from '@/core/domain/repositories';
import { IPaginatedResponse, IPayment } from '@/core/domain/interfaces';

import { POSTGRES_DATA_SOURCE } from '@/config';

export class PaymentRepository implements IPaymentRepositoryPort {
  constructor(
    @InjectRepository(Payment, POSTGRES_DATA_SOURCE)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async getStatus(paymentId: number): Promise<Pick<Payment, 'id' | 'paymentStatus' | 'createdAt'>> {
    const payment = await this.paymentRepository.findOneBy({ id: paymentId });
    if (!payment) throw new Error('Payment not found');

    const newPayment: Pick<Payment, 'id' | 'paymentStatus' | 'createdAt'> = {
      id: payment.id,
      paymentStatus: payment.paymentStatus,
      createdAt: payment.createdAt,
    };

    return newPayment;
  }

  async getPaymentBy({
    skip,
    take,
    status,
    method,
    orderId,
    search,
  }: GetPaymentDTO): Promise<IPaginatedResponse<Payment>> {
    const queryBuilder = this.paymentRepository
      .createQueryBuilder('payment')
      .innerJoinAndSelect('payment.order', 'order')
      .innerJoinAndSelect('order.customer', 'customer')
      .innerJoinAndSelect('order.products', 'products')
      .skip(skip)
      .take(take);

    if (status) queryBuilder.andWhere('payment.paymentStatus = :status', { status: status });
    if (method) queryBuilder.andWhere('payment.paymentMethod = :method', { method: method });
    if (orderId) queryBuilder.andWhere('order.id = :orderId', { orderId: orderId });

    if (search)
      queryBuilder.andWhere(`customer.name like '%${search}%' or product.name like '%${search}%'`);

    const payments = await queryBuilder.getMany();
    const paymentCount = await queryBuilder.getCount();

    return { data: payments, total: paymentCount };
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

  async updatePaymentStatus(paymentId: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOneByOrFail({ id: paymentId });
    payment.paymentStatus = PaymentStatus.CONCLUDED;
    return await this.paymentRepository.save(payment);
  }
}
