import { Customer } from '@/core/domain/entities';
import { ICustomer } from '@/core/domain/interfaces';
import { ICustomerRepositoryPort } from '@/core/domain/repositories';

export class CustomerRepository implements ICustomerRepositoryPort {
  constructor() {}

  getCustomers(): Promise<ICustomer[]> {
    throw new Error('Method not implemented.');
  }
  findCustomerBybId(id: number): Promise<ICustomer> {
    console.log(id);
    throw new Error('Method not implemented.');
  }
  insert(entity: Customer | Customer[]): Promise<void> {
    console.log(entity);
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): Promise<Customer> {
    console.log(id);
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Customer[]> {
    throw new Error('Method not implemented.');
  }
  delete(entity: Customer): Promise<boolean> {
    console.log(entity);
    throw new Error('Method not implemented.');
  }
}
