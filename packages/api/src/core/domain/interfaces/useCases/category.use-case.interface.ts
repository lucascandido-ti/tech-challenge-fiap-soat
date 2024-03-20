import { GetCategoriesDTO, CreateCategoryDTO, GetProductDTO } from '../../dto';
import { IPaginatedResponse } from '../utils';
import { ICategory, IProduct } from '../entities';

export interface ICategoryUseCase {
  findById(id: number): Promise<ICategory>;
  getProductsByCategory(
    id: number,
    getProductDTO: GetProductDTO,
  ): Promise<IPaginatedResponse<IProduct>>;
  findByIds(ids: number[]): Promise<ICategory[]>;
  createCategory(createCategoryDTO: CreateCategoryDTO[]): Promise<ICategory[]>;
  getCategoriesBy(getCategoriesDTO: GetCategoriesDTO): Promise<IPaginatedResponse<ICategory>>;
}
