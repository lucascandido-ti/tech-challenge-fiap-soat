import { CreateCustomerDTO, GetCustomersDTO } from '../../dto';
import { ICustomer } from '../entities';
import { IPaginatedResponse } from '../utils';

export interface ICustomerUseCase {
  findAll(): Promise<ICustomer[]>;
  createCustomer(createCustomerDTO: CreateCustomerDTO): Promise<ICustomer>;
  getCustomersBy(getCustomersDto: GetCustomersDTO): Promise<IPaginatedResponse<ICustomer>>;
}
