import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';

import { ProductRepository } from '@/adapter/driven';
import { ProductController } from '@/adapter/driver/controllers';

import { Category, Product } from '@/core/domain/entities';
import { ProductUseCase } from '@/core/application/product';
import {
  CATEGORY_REPOSITORY,
  CATEGORY_USECASE,
  POSTGRES_DATA_SOURCE,
  PRODUCT_REPOSITORY,
  PRODUCT_USECASE,
} from '@/config';
import { CategoryRepository } from '@/adapter/driven/infra/category.repository';
import { CategoryUseCase } from '@/core/application';

const httpControllers = [ProductController];
const handlers: Provider[] = [ProductUseCase, CategoryUseCase];
const repositories: Provider[] = [
  { provide: CATEGORY_REPOSITORY, useClass: CategoryRepository },
  { provide: CATEGORY_USECASE, useClass: CategoryUseCase },
  { provide: PRODUCT_REPOSITORY, useClass: ProductRepository },
  { provide: PRODUCT_USECASE, useClass: ProductUseCase },
];

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category], POSTGRES_DATA_SOURCE)],
  controllers: [...httpControllers],
  providers: [...handlers, ...repositories],
})
export class ProductModule {}
