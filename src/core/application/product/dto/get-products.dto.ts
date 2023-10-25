import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class GetProductDTO {
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

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  categoryId: number;
}
