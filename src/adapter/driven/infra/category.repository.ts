import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, In, Repository } from 'typeorm';

import { Category } from '@/core/domain/entities';
import { ICategoryRepositoryPort } from '@/core/domain/repositories';
import { POSTGRES_DATA_SOURCE } from '@/config';

export class CategoryRepository implements ICategoryRepositoryPort {
  constructor(
    @InjectRepository(Category, POSTGRES_DATA_SOURCE)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findByIds(ids: number[]): Promise<Category[]> {
    if (!ids.length) throw new Error('No ID found');
    const categories = await this.categoryRepository.findBy({ id: In(ids) });
    return categories;
  }

  insert(_: Category): Promise<Category> {
    throw new Error('Method not implemented.');
  }
  findOneById(_: string | number): Promise<Category> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Category[]> {
    throw new Error('Method not implemented.');
  }
  delete(_: Category): Promise<DeleteResult> {
    throw new Error('Method not implemented.');
  }
}
