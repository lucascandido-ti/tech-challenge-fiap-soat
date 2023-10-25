import { PRODUCT_REPOSITORY } from '@/config';
import { IPaginatedResponse, IProduct, IProductUseCase } from '@/core/domain/interfaces';
import { IProductRepositoryPort } from '@/core/domain/repositories';
import { Inject, Injectable } from '@nestjs/common';
import { GetProductDTO } from '../dto';

@Injectable()
export class ProductUseCase implements IProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly _productRepository: IProductRepositoryPort,
  ) {}

  async getProductsBy(getProductsDTO: GetProductDTO): Promise<IPaginatedResponse<IProduct>> {
    return await this._productRepository.getProductsBy(getProductsDTO);
  }

  async findAll(): Promise<IProduct[]> {
    return await this._productRepository.findAll();
  }
}
