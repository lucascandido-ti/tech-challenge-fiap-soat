import { Inject, Injectable } from '@nestjs/common';

import { ICustomerRepositoryPort } from '@/core/domain/repositories';
import { ICustomer, ICustomerUseCase, IPaginatedResponse } from '@/core/domain/interfaces';

import { CUSTOMER_REPOSITORY } from '@/config';
import { Customer } from '@/core/domain/entities';
import { CreateCustomerDTO, GetCustomersDTO } from '@/core/domain/dto';

@Injectable()
export class CustomerUseCase implements ICustomerUseCase {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly _customerRespository: ICustomerRepositoryPort,
  ) {}

  async findById(id: number): Promise<ICustomer> {
    return await this._customerRespository.findOneById(id);
  }

  async findAll(): Promise<ICustomer[]> {
    const customers = await this._customerRespository.findAll();
    return customers;
  }

  async createCustomer({ cpf, email, name }: CreateCustomerDTO): Promise<ICustomer> {
    const formatCPF = String(cpf).replace(/[^a-zA-Z0-9]/g, '');

    const findCustomerByCPF = await this._customerRespository.getCustomersBy({
      skip: 0,
      take: 10,
      search: formatCPF,
    });
    if (findCustomerByCPF.total !== 0) return findCustomerByCPF.data[0];

    const findCustomerByEmail = await this._customerRespository.getCustomersBy({
      skip: 0,
      take: 10,
      search: email,
    });
    if (findCustomerByEmail.total !== 0) return findCustomerByEmail.data[0];

    const customer = Customer.create({ cpf: formatCPF, email, name });
    return await this._customerRespository.insert(customer);
  }

  async getCustomersBy(getCustomersDto: GetCustomersDTO): Promise<IPaginatedResponse<ICustomer>> {
    return await this._customerRespository.getCustomersBy(getCustomersDto);
  }
}
