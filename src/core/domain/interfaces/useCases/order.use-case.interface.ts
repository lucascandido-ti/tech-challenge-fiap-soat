import { CreateOrderUseCaseDTO, GetOrdersDTO } from '../../dto';
import { IOrder } from '../entities';
import { IPaginatedResponse } from '../utils';

export interface IOrderUseCase {
  findAll(): Promise<IOrder[]>;
  findOneById(id: number): Promise<IOrder>;
  createOrder(createOrderDTO: CreateOrderUseCaseDTO): Promise<IOrder>;
  getOrderBy(getOrdersDto: GetOrdersDTO): Promise<IPaginatedResponse<IOrder>>;
  findByCustomer(customerId: number): Promise<IOrder[]>;
}
