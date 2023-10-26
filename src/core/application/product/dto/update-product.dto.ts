import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { Price } from '@/core/domain/value-objects';

export class UpdateProductDTO {
  @IsNumber()
  @IsNotEmpty()
  id?: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: Price;

  @ArrayMaxSize(1000)
  @ArrayNotEmpty()
  @IsArray()
  categoryIds?: number[];

  @IsDate()
  @IsOptional()
  createdAt: Date;
}
