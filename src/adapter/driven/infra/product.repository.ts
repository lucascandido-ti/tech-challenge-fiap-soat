import { Product } from '@/core/domain/entities';
import { IProductRepositoryPort } from '@/core/domain/repositories';
import { DeleteResult } from 'typeorm';

export class ProductRepository implements IProductRepositoryPort {
  insert(entity: Product): Promise<Product> {
    console.log(entity);
    throw new Error('Method not implemented.');
  }
  findOneById(id: string | number): Promise<Product> {
    console.log(id);
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }
  delete(entity: Product): Promise<DeleteResult> {
    console.log(entity);
    throw new Error('Method not implemented.');
  }
}
