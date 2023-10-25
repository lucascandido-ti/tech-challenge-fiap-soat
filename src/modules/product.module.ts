import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';

import { ProductRepository } from '@/adapter/driven';
import { ProductController } from '@/adapter/driver/controllers';

import { Product } from '@/core/domain/entities';
import { ProductUseCase } from '@/core/application/product';
import { POSTGRES_DATA_SOURCE, PRODUCT_REPOSITORY, PRODUCT_USECASE } from '@/config';

const httpControllers = [ProductController];
const handlers: Provider[] = [ProductUseCase];
const repositories: Provider[] = [
  { provide: PRODUCT_REPOSITORY, useClass: ProductRepository },
  { provide: PRODUCT_USECASE, useClass: ProductUseCase },
];

@Module({
  imports: [TypeOrmModule.forFeature([Product], POSTGRES_DATA_SOURCE)],
  controllers: [...httpControllers],
  providers: [...handlers, ...repositories],
})
export class ProductModule {}
