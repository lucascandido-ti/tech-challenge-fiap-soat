import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, In, Repository } from 'typeorm';

import { Category } from '@/core/domain/entities';
import { ICategoryRepositoryPort } from '@/core/domain/repositories';
import { POSTGRES_DATA_SOURCE } from '@/config';
import { GetCategoriesDTO } from '@/core/domain/dto';
import { IPaginatedResponse, ICategory } from '@/core/domain/interfaces';

export class CategoryRepository implements ICategoryRepositoryPort {
  constructor(
    @InjectRepository(Category, POSTGRES_DATA_SOURCE)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getCategoriesBy({
    skip,
    take,
    search,
    products,
  }: GetCategoriesDTO): Promise<IPaginatedResponse<ICategory>> {
    const queryBuilder = this.categoryRepository
      .createQueryBuilder('categories')
      .leftJoinAndSelect('categories.products', 'products')
      .skip(skip)
      .take(take);

    if (search)
      queryBuilder.andWhere(
        '(LOWER(categories.name) LIKE :search OR LOWER(categories.description) LIKE :search)',
        {
          search: `%${search.toLowerCase()}%`,
        },
      );

    if (products)
      queryBuilder.andWhere(
        '(LOWER(products.name) LIKE :search OR LOWER(products.description) LIKE :search)',
        {
          search: `%${products.toLowerCase()}%`,
        },
      );

    const categoriesCount = await queryBuilder.getCount();
    const categories = await queryBuilder.getMany();

    return { data: categories, total: categoriesCount };
  }

  async findByIds(ids: number[]): Promise<Category[]> {
    if (!ids.length) throw new Error('No ID found');
    const categories = await this.categoryRepository.findBy({ id: In(ids) });
    return categories;
  }

  async insert(entity: Category): Promise<Category> {
    const category = this.categoryRepository.create(entity);
    return await this.categoryRepository.save(category);
  }

  async findOneById(id: number): Promise<Category> {
    const category = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.products', 'products')
      .where('category.id = :categoryID', { categoryID: id })
      .getOne();

    return category;
  }
  findAll(): Promise<Category[]> {
    throw new Error('Method not implemented.');
  }
  delete(_: Category): Promise<DeleteResult> {
    throw new Error('Method not implemented.');
  }
}
