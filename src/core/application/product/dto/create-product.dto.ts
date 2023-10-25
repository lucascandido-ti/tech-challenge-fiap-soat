import { Category } from '@/core/domain/entities';
import { IProduct } from '@/core/domain/interfaces';
import { Price } from '@/core/domain/value-objects';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDTO implements Omit<IProduct, 'orders' | 'categories' | 'createdAt'> {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: Price;

  @ArrayMaxSize(1000)
  @ArrayNotEmpty()
  @IsArray()
  categoryIds?: number[];

  @ArrayMaxSize(1000)
  @ArrayNotEmpty()
  @IsArray()
  @IsOptional()
  categories?: Category[];
}
