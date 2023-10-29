import { CategoryController } from './../adapter/driver/controllers/category.controller';
import { CategoryRepository } from '@/adapter/driven/infra';
import { CATEGORY_REPOSITORY, CATEGORY_USECASE, POSTGRES_DATA_SOURCE } from '@/config';
import { CategoryUseCase } from '@/core/application';

import { Category } from '@/core/domain/entities';
import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

const httpControllers = [CategoryController];
const handlers: Provider[] = [CategoryUseCase];
const repositories: Provider[] = [
  { provide: CATEGORY_REPOSITORY, useClass: CategoryRepository },
  { provide: CATEGORY_USECASE, useClass: CategoryUseCase },
];

@Module({
  imports: [TypeOrmModule.forFeature([Category], POSTGRES_DATA_SOURCE)],
  controllers: [...httpControllers],
  providers: [...handlers, ...repositories],
})
export class CategoryModule {}
