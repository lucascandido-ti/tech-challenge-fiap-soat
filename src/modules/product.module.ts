import { ProductController } from './../adapter/driver/controllers/product.controller';
import { ProductRepository } from '@/adapter/driven';
import { PRODUCT_REPOSITORY, PRODUCT_USECASE } from '@/config';
import { ProductUseCase } from '@/core/application/product';
import { Module, Provider } from '@nestjs/common';

const httpControllers = [ProductController];
const handlers: Provider[] = [ProductUseCase];
const repositories: Provider[] = [
  { provide: PRODUCT_REPOSITORY, useClass: ProductRepository },
  { provide: PRODUCT_USECASE, useClass: ProductUseCase },
];

@Module({
  imports: [],
  controllers: [...httpControllers],
  providers: [...handlers, ...repositories],
})
export class ProductModule {}
