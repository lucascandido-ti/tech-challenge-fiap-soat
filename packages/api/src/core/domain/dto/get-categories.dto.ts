import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { IPaginatedRequest } from '@/core/domain/interfaces';

export class GetCategoriesDTO implements IPaginatedRequest {
  @Min(0)
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  skip = 0;

  @Max(100)
  @Min(0)
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  take = 10;

  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  products?: string;
}
