import { PRODUCT_USECASE } from '@/config';
import { CreateProductDTO, GetProductDTO, UpdateProductDTO } from '@/core/application/product/dto';
import { ApiOperationWithBody, ApiOperationWithParams } from '@/core/domain/decorators';
import { IPaginatedResponse, IProduct, IProductUseCase } from '@/core/domain/interfaces';
import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Query } from '@nestjs/common';

@Controller('/product')
export class ProductController {
  constructor(
    @Inject(PRODUCT_USECASE)
    private readonly _productUseCase: IProductUseCase,
  ) {}

  @ApiOperationWithParams({
    summary: 'View Products',
    responseDescription: 'List Products',
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

  @ApiOperationWithBody({
    summary: 'Create Product',
    responseDescription: 'Product created successfully',
    requestBodyType: CreateProductDTO,
  })
  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async insert(@Body() createProductDTO: CreateProductDTO): Promise<IProduct> {
    return this._productUseCase.createProduct(createProductDTO);
  }

  @ApiOperationWithBody({
    summary: 'Update Product',
    responseDescription: 'Product updated successfully',
    requestBodyType: CreateProductDTO,
  })
  @Post('/update')
  @HttpCode(HttpStatus.ACCEPTED)
  async updateProduct(@Body() updateProductDTO: UpdateProductDTO): Promise<IProduct> {
    return this._productUseCase.updateProduct(updateProductDTO);
  }
}
