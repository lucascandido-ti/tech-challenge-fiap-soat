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

  async insert(entity: Payment): Promise<Payment> {
    const payment = this.paymentRepository.create(entity);
    return this.paymentRepository.save(payment);
  }

  async findOneById(id: string | number): Promise<Payment> {
    return this.paymentRepository.findOneByOrFail({ id: Number(id) });
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentRepository.createQueryBuilder('payment').getMany();
  }
}
