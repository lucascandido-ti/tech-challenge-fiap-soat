import { CATEGORY_USECASE } from '@/config';
import { ApiOperationWithBody, ApiOperationWithParams } from '@/core/domain/decorators';
import { CreateCategoryDTO, GetProductDTO } from '@/core/domain/dto';
import { GetCategoriesDTO } from '@/core/domain/dto/get-categories.dto';
import {
  ICategory,
  ICategoryUseCase,
  IPaginatedResponse,
  IProduct,
} from '@/core/domain/interfaces';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';

@Controller('/category')
export class CategoryController {
  constructor(
    @Inject(CATEGORY_USECASE)
    private readonly _categoryUseCase: ICategoryUseCase,
  ) {}

  @ApiOperationWithParams({
    summary: 'View Categories',
    responseDescription: 'List Category',
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getCategory(@Param('id') id: number): Promise<ICategory> {
    return this._categoryUseCase.findById(id);
  }

  @ApiOperationWithParams({
    summary: 'View Productsc By Category',
    responseDescription: 'List Productsc By Category',
  })
  @Get(':id/products')
  @HttpCode(HttpStatus.OK)
  async getProductsByCategory(
    @Param('id') id: number,
    @Query() getProductDTO: GetProductDTO,
  ): Promise<IPaginatedResponse<IProduct>> {
    return this._categoryUseCase.getProductsByCategory(id, getProductDTO);
  }

  @ApiOperationWithParams({
    summary: 'View Categories',
    responseDescription: 'List Categories',
    queryParameters: [
      { name: 'skip', description: 'Number of items to be skipped' },
      { name: 'take', description: 'Number of items to be listed' },
      { name: 'search', description: 'Live field for search' },
    ],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getCategories(
    @Query() getCategoriesDto: GetCategoriesDTO,
  ): Promise<IPaginatedResponse<ICategory>> {
    return this._categoryUseCase.getCategoriesBy(getCategoriesDto);
  }

  @ApiOperationWithBody({
    summary: 'Create Category',
    responseDescription: 'Category created successfully',
    requestBodyType: CreateCategoryDTO,
  })
  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async insert(@Body() createCategoryDTO: CreateCategoryDTO[]): Promise<ICategory | ICategory[]> {
    return this._categoryUseCase.createCategory(createCategoryDTO);
  }
}
