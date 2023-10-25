import { GetProductDTO } from '@/core/application/product/dto';
import { RepositoryPort } from '../base';
import { Product } from '../entities';
import { IPaginatedResponse, IProduct } from '../interfaces';

export interface IProductRepositoryPort extends RepositoryPort<Product> {
  getProductsBy(getProductsDTO: GetProductDTO): Promise<IPaginatedResponse<IProduct>>;
}
