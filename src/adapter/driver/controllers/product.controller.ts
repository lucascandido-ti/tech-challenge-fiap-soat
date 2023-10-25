import { PRODUCT_USECASE } from '@/config';
import { ApiOperationWithParams } from '@/core/domain/decorators';
import { IProduct, IProductUseCase } from '@/core/domain/interfaces';
import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common';

@Controller('/product')
export class ProductController {
  constructor(
    @Inject(PRODUCT_USECASE)
    private readonly _productUseCase: IProductUseCase,
  ) {}

  @ApiOperationWithParams({
    summary: 'View Products',
    responseDescription: 'List Customers',
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<IProduct[]> {
    return this._productUseCase.findAll();
  }
}
