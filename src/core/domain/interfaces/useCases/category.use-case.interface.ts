import { GetCategoriesDTO, CreateCategoryDTO } from '../../dto';
import { IPaginatedResponse } from '../utils';
import { ICategory } from '../entities';

export interface ICategoryUseCase {
  findById(id: number): Promise<ICategory>;
  findByIds(ids: number[]): Promise<ICategory[]>;
  createCategory(createCategoryDTO: CreateCategoryDTO[]): Promise<ICategory[]>;
  getCategoriesBy(getCategoriesDTO: GetCategoriesDTO): Promise<IPaginatedResponse<ICategory>>;
}
