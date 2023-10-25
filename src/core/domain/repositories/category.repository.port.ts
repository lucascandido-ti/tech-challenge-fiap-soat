import { RepositoryPort } from '../base';
import { Category } from '../entities';

export interface ICategoryRepositoryPort extends RepositoryPort<Category> {
  findByIds(ids: number[]): Promise<Category[]>;
}
