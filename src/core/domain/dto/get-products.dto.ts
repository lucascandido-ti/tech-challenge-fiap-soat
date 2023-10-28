import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class GetProductDTO {
  @Min(0)
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  skip? = 0;

  @Max(100)
  @Min(0)
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  take? = 10;

  @IsString()
  @IsOptional()
  search?: string;

  @ArrayMaxSize(10)
  @ArrayNotEmpty()
  @IsArray()
  @IsOptional()
  productIds?: number[];

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  categoryId?: number;
}
