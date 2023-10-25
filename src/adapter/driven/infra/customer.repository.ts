import { InjectRepository } from '@nestjs/typeorm';

import { DeepPartial, DeleteResult, Repository } from 'typeorm';

import { Customer } from '@/core/domain/entities';
import { ICustomerRepositoryPort } from '@/core/domain/repositories';
import { POSTGRES_DATA_SOURCE } from '@/config';

export class CustomerRepository implements ICustomerRepositoryPort {
  constructor(
    @InjectRepository(Customer, POSTGRES_DATA_SOURCE)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async insert(entity: DeepPartial<Customer>): Promise<Customer> {
    const customers = this.customerRepository.create(entity);
    return this.customerRepository.save(customers);
  }

  findOneById(id: number): Promise<Customer> {
    return this.customerRepository.findOne({ where: { id: id } });
  }
  findAll(): Promise<Customer[]> {
    return this.customerRepository.createQueryBuilder('customer').getMany();
  }
  delete(entity: Customer): Promise<DeleteResult> {
    return this.customerRepository.delete(entity.id);
  }
}
