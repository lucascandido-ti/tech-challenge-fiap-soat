import { CreateProductDTO, GetProductDTO } from '@/core/application/product/dto';
import { IProduct } from '../entities';
import { IPaginatedResponse } from '../utils';

export interface IProductUseCase {
  findAll(): Promise<IProduct[]>;
  getProductsBy(getProductsDTO: GetProductDTO): Promise<IPaginatedResponse<IProduct>>;
  createProduct(createProductDTO: CreateProductDTO): Promise<IProduct>;
}
