import { IProduct } from '../entities';

export interface IProductUseCase {
  findAll(): Promise<IProduct[]>;
}
