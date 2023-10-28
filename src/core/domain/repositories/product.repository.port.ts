import { RepositoryPort } from '../base';
import { GetProductDTO } from '../dto';
import { Product } from '../entities';
import { IPaginatedResponse } from '../interfaces';

export interface IProductRepositoryPort extends RepositoryPort<Product> {
  getProductsBy(getProductsDTO: GetProductDTO): Promise<IPaginatedResponse<Product>>;
}
