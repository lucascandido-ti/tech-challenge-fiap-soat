import { CreateCustomerDTO } from '@/core/application/customer/dto';
import { ICustomer } from '../entities';

export interface ICustomerUseCase {
  findAll(): Promise<ICustomer[]>;
  createCustomer(createCustomerDTO: CreateCustomerDTO): Promise<ICustomer>;
}
