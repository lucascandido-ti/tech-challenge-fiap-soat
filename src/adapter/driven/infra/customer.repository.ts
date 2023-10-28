import { InjectRepository } from '@nestjs/typeorm';

import { DeepPartial, DeleteResult, Repository } from 'typeorm';

import { Customer } from '@/core/domain/entities';
import { ICustomerRepositoryPort } from '@/core/domain/repositories';
import { POSTGRES_DATA_SOURCE } from '@/config';
import { ICustomer, IPaginatedResponse } from '@/core/domain/interfaces';
import { GetCustomersDTO } from '@/core/domain/dto';

export class CustomerRepository implements ICustomerRepositoryPort {
  constructor(
    @InjectRepository(Customer, POSTGRES_DATA_SOURCE)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async getCustomersBy({
    skip,
    take,
    search,
  }: GetCustomersDTO): Promise<IPaginatedResponse<ICustomer>> {
    const queryBuilder = this.customerRepository
      .createQueryBuilder('customers')
      .skip(skip)
      .take(take);

    if (search)
      queryBuilder.andWhere(
        '(customers.cpf LIKE :search OR customers.email LIKE :search OR customers.name LIKE :search)',
        {
          search: `%${search}%`,
        },
      );

    const customersCount = await queryBuilder.getCount();
    const customers = await queryBuilder.getMany();

    return { data: customers, total: customersCount };
  }

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
