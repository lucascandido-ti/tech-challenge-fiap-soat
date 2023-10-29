import { RepositoryPort } from '../base';
import { GetCategoriesDTO, GetProductDTO } from '../dto';
import { Category } from '../entities';
import { ICategory, IPaginatedResponse, IProduct } from '../interfaces';

export interface ICategoryRepositoryPort extends RepositoryPort<Category> {
  findByIds(ids: number[]): Promise<Category[]>;
  getCategoriesBy(getCategoriesDTO: GetCategoriesDTO): Promise<IPaginatedResponse<ICategory>>;
  getProductsByCategory(
    id: number,
    getProductDTO: GetProductDTO,
  ): Promise<IPaginatedResponse<IProduct>>;
}
