import { Inject, Injectable } from '@nestjs/common';

import { ICustomerRepositoryPort } from '@/core/domain/repositories';
import { ICustomer, ICustomerUseCase, IPaginatedResponse } from '@/core/domain/interfaces';

import { CUSTOMER_REPOSITORY } from '@/config';
import { CreateCustomerDTO, GetCustomersDTO } from '../dto';
import { Customer } from '@/core/domain/entities';

@Injectable()
export class CustomerUseCase implements ICustomerUseCase {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly _customerRespository: ICustomerRepositoryPort,
  ) {}

  async findAll(): Promise<ICustomer[]> {
    const customers = await this._customerRespository.findAll();
    return customers;
  }

  async createCustomer({ cpf, email, name }: CreateCustomerDTO): Promise<ICustomer> {
    const customer = Customer.create({ cpf, email, name });
    return await this._customerRespository.insert(customer);
  }

  async getCustomersBy(getCustomersDto: GetCustomersDTO): Promise<IPaginatedResponse<ICustomer>> {
    return await this._customerRespository.getCustomersBy(getCustomersDto);
  }
}
