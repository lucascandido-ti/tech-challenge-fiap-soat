import { POSTGRES_DATA_SOURCE } from '@/config';
import { Product } from '@/core/domain/entities';
import { IProductRepositoryPort } from '@/core/domain/repositories';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

export class ProductRepository implements IProductRepositoryPort {
  constructor(
    @InjectRepository(Product, POSTGRES_DATA_SOURCE)
    private readonly productRepository: Repository<Product>,
  ) {}

  insert(entity: Product): Promise<Product> {
    console.log(entity);
    throw new Error('Method not implemented.');
  }
  findOneById(id: string | number): Promise<Product> {
    console.log(id);
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Product[]> {
    return this.productRepository.findBy({});
  }
  delete(entity: Product): Promise<DeleteResult> {
    console.log(entity);
    throw new Error('Method not implemented.');
  }
}
