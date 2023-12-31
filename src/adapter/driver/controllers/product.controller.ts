import { PRODUCT_USECASE } from '@/config';
import { ApiOperationWithBody, ApiOperationWithParams } from '@/core/domain/decorators';
import { CreateProductDTO, GetProductDTO, UpdateProductDTO } from '@/core/domain/dto';
import { IPaginatedResponse, IProduct, IProductUseCase } from '@/core/domain/interfaces';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';

@Controller('/product')
export class ProductController {
  constructor(
    @Inject(PRODUCT_USECASE)
    private readonly _productUseCase: IProductUseCase,
  ) {}

  @ApiOperationWithParams({
    summary: 'View Product',
    responseDescription: 'List Product',
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getProductById(@Param('id') id: number): Promise<IProduct> {
    return this._productUseCase.findById(id);
  }

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
  async insert(@Body() createProductDTO: CreateProductDTO[]): Promise<IProduct | IProduct[]> {
    return this._productUseCase.createProduct(createProductDTO);
  }

  @ApiOperationWithBody({
    summary: 'Update Product',
    responseDescription: 'Product updated successfully',
    requestBodyType: CreateProductDTO,
  })
  @Post('/update')
  @HttpCode(HttpStatus.ACCEPTED)
  async updateProduct(@Body() updateProductDTO: UpdateProductDTO): Promise<IProduct | IProduct[]> {
    return this._productUseCase.updateProduct(updateProductDTO);
  }

  @ApiOperationWithParams({
    summary: 'Delete Products',
    responseDescription: 'Delete Products',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteProduct(@Param('id') id: number): Promise<DeleteResult> {
    return this._productUseCase.delete(id);
  }
}
