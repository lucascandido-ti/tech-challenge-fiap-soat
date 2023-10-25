import { ICustomer } from '../entities';

export interface ICustomerUseCase {
  getCustomers(): Promise<ICustomer[]>;
}
