import { IOrder } from '../entities';

export interface IOrderUseCase {
  findAll(): Promise<IOrder[]>;
}
