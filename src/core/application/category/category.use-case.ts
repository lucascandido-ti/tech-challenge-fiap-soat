import { CATEGORY_REPOSITORY } from '@/config';
import { ICategory, ICategoryUseCase } from '@/core/domain/interfaces';
import { ICategoryRepositoryPort } from '@/core/domain/repositories';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CategoryUseCase implements ICategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly _categoryRepository: ICategoryRepositoryPort,
  ) {}

  findByIds(ids: number[]): Promise<ICategory[]> {
    return this._categoryRepository.findByIds(ids);
  }
}
