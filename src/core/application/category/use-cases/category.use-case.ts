import { CATEGORY_REPOSITORY } from '@/config';
import { GetCategoriesDTO } from '@/core/domain/dto';
import { CreateCategoryDTO } from '@/core/domain/dto/create-category.dto';
import { Category } from '@/core/domain/entities';
import { ICategory, ICategoryUseCase, IPaginatedResponse } from '@/core/domain/interfaces';
import { ICategoryRepositoryPort } from '@/core/domain/repositories';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CategoryUseCase implements ICategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly _categoryRepository: ICategoryRepositoryPort,
  ) {}

  async findById(id: number): Promise<ICategory> {
    return await this._categoryRepository.findOneById(id);
  }

  async getCategoriesBy(
    getCategoriesDTO: GetCategoriesDTO,
  ): Promise<IPaginatedResponse<ICategory>> {
    return await this._categoryRepository.getCategoriesBy(getCategoriesDTO);
  }

  async createCategory(createCategories: CreateCategoryDTO[]): Promise<ICategory[]> {
    const categories: Category[] = [];

    for await (const createCategory of createCategories) {
      const { name, description } = createCategory;
      const category = Category.create({ name, description });

      categories.push(category);
    }

    for await (const category of categories) {
      await this._categoryRepository.insert(category);
    }

    return categories;
  }

  findByIds(ids: number[]): Promise<ICategory[]> {
    return this._categoryRepository.findByIds(ids);
  }
}
