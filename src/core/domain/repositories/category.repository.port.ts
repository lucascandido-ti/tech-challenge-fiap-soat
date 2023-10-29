import { RepositoryPort } from '../base';
import { GetCategoriesDTO } from '../dto';
import { Category } from '../entities';
import { ICategory, IPaginatedResponse } from '../interfaces';

export interface ICategoryRepositoryPort extends RepositoryPort<Category> {
  findByIds(ids: number[]): Promise<Category[]>;
  getCategoriesBy(getCategoriesDTO: GetCategoriesDTO): Promise<IPaginatedResponse<ICategory>>;
}
