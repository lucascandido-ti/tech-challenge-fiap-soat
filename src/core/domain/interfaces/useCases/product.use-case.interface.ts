import { DeleteResult } from 'typeorm';

import { IProduct } from '../entities';
import { IPaginatedResponse } from '../utils';
import { CreateProductDTO, GetProductDTO, UpdateProductDTO } from '../../dto';

export interface IProductUseCase {
  findAll(): Promise<IProduct[]>;
  findById(id: number): Promise<IProduct>;
  getProductsBy(getProductsDTO: GetProductDTO): Promise<IPaginatedResponse<IProduct>>;
  createProduct(createProductDTO: CreateProductDTO[]): Promise<IProduct | IProduct[]>;
  updateProduct(updateProductDTO: UpdateProductDTO): Promise<IProduct>;
  delete(id: number): Promise<DeleteResult>;
}
