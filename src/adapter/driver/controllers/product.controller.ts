import { PRODUCT_USECASE } from '@/config';
import { GetProductDTO } from '@/core/application/product/dto';
import { ApiOperationWithParams } from '@/core/domain/decorators';
import { IPaginatedResponse, IProduct, IProductUseCase } from '@/core/domain/interfaces';
import { Controller, Get, HttpCode, HttpStatus, Inject, Query } from '@nestjs/common';

@Controller('/product')
export class ProductController {
  constructor(
    @Inject(PRODUCT_USECASE)
    private readonly _productUseCase: IProductUseCase,
  ) {}

  @ApiOperationWithParams({
    summary: 'View Products',
    responseDescription: 'List Customers',
    queryParameters: [
      { name: 'skip', description: 'Number of items to be skipped' },
      { name: 'take', description: 'Number of items to be listed' },
      { name: 'search', description: 'Live field for search' },
      { name: 'categoryId', description: 'ID of the category you want to filter' },
    ],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getProductsBy(
    @Query() getProductsDTO: GetProductDTO,
  ): Promise<IPaginatedResponse<IProduct>> {
    return this._productUseCase.getProductsBy(getProductsDTO);
  }
}
