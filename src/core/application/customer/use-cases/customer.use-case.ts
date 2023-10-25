import { CUSTOMER_REPOSITORY } from '@/config';
import { ICustomer, ICustomerUseCase } from '@/core/domain/interfaces';
import { ICustomerRepositoryPort } from '@/core/domain/repositories';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CustomerUseCase implements ICustomerUseCase {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly _customerRespository: ICustomerRepositoryPort,
  ) {}

  async getCustomers(): Promise<ICustomer[]> {
    const teste = await this._customerRespository.findAll();
    console.log('teste', teste);
    const customers: ICustomer[] = [];
    return customers;
  }
}
