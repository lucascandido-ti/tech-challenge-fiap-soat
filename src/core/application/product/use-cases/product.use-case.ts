import { PRODUCT_REPOSITORY } from '@/config';
import { IProduct, IProductUseCase } from '@/core/domain/interfaces';
import { IProductRepositoryPort } from '@/core/domain/repositories';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProductUseCase implements IProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly _productRepository: IProductRepositoryPort,
  ) {}

  async findAll(): Promise<IProduct[]> {
    return await this._productRepository.findAll();
  }
}
