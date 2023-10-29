import { ICategory } from '@/core/domain/interfaces';
import { IsString } from 'class-validator';

export class CreateCategoryDTO implements Omit<ICategory, 'products' | 'createdAt'> {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
