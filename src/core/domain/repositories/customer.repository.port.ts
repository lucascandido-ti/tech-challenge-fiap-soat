import { RepositoryPort } from '../base';
import { Customer } from '../entities';
import { ICustomer } from '../interfaces/entities';

export interface ICustomerRepositoryPort extends RepositoryPort<Customer> {
  getCustomers(): Promise<ICustomer[]>;
  findCustomerBybId(id: number): Promise<ICustomer>;
}
