import { POSTGRES_DATA_SOURCE } from '@/config';
import { GetProductDTO } from '@/core/application/product/dto';
import { Product } from '@/core/domain/entities';
import { IPaginatedResponse, IProduct } from '@/core/domain/interfaces';
import { IProductRepositoryPort } from '@/core/domain/repositories';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, DeleteResult, Repository } from 'typeorm';

export class ProductRepository implements IProductRepositoryPort {
  constructor(
    @InjectRepository(Product, POSTGRES_DATA_SOURCE)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getProductsBy({
    skip,
    take,
    search,
    categoryId,
  }: GetProductDTO): Promise<IPaginatedResponse<IProduct>> {
    const queryBuilder = this.productRepository
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.categories', 'categories')
      .skip(skip)
      .take(take);

    if (categoryId) {
      queryBuilder.andWhere('categories.id = :categoryId', { categoryId: categoryId });
    }

    if (search)
      queryBuilder.andWhere('(products.name LIKE :search OR products.description LIKE :search)', {
        search: `%${search}%`,
      });

    const productsCount = await queryBuilder.getCount();
    const products = await queryBuilder.getMany();

    return { data: products, total: productsCount };
  }

  async insert(entity: DeepPartial<Product>): Promise<Product> {
    const products = this.productRepository.create(entity);
    return this.productRepository.save(products);
  }

  async findOneById(id: number): Promise<Product> {
    return await this.productRepository.findOne({ where: { id: id } });
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.findBy({});
  }
  async delete(entity: Product): Promise<DeleteResult> {
    return await this.productRepository.delete(entity.id);
  }
}
