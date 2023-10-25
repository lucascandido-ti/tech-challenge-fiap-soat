import { GetCustomersDTO } from '@/core/application/customer/dto';
import { RepositoryPort } from '../base';
import { Customer } from '../entities';
import { ICustomer, IPaginatedResponse } from '../interfaces';

export interface ICustomerRepositoryPort extends RepositoryPort<Customer> {
  getCustomersBy(getCustomersDto: GetCustomersDTO): Promise<IPaginatedResponse<ICustomer>>;
}
