import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { IPaginatedRequest } from '@/core/domain/interfaces';

export class GetCustomersDTO implements IPaginatedRequest {
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

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  search?: string;
}
