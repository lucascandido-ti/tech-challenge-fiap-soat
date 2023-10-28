import { POSTGRES_DATA_SOURCE } from '@/config';
import { Payment } from '@/core/domain/entities';
import { IPaymentRepositoryPort } from '@/core/domain/repositories';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class PaymentRepository implements IPaymentRepositoryPort {
  constructor(
    @InjectRepository(Payment, POSTGRES_DATA_SOURCE)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  insert(entity: Payment): Promise<Payment> {
    const payment = this.paymentRepository.create(entity);
    return this.paymentRepository.save(payment);
  }
  findOneById(_: string | number): Promise<Payment> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Payment[]> {
    throw new Error('Method not implemented.');
  }
}
