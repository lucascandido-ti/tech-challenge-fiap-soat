import {
  ArrayMaxSize,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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
  price?: number;

  @ArrayMaxSize(1000)
  @IsArray()
  @IsOptional()
  categoryIds?: number[];

  @IsDate()
  @IsOptional()
  createdAt: Date;
}
