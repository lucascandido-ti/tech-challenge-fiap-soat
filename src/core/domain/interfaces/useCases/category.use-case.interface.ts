import { ICategory } from '../entities';

export interface ICategoryUseCase {
  findByIds(ids: number[]): Promise<ICategory[]>;
}
