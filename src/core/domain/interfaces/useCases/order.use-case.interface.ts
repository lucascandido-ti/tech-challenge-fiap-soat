import { CreateOrderUseCaseDTO } from '../../dto';
import { IOrder } from '../entities';

export interface IOrderUseCase {
  findAll(): Promise<IOrder[]>;
  findOneById(id: number): Promise<IOrder>;
  createOrder(createOrderDTO: CreateOrderUseCaseDTO): Promise<IOrder>;
}
