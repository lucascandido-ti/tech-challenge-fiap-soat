import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

import { PaymentMethod, PaymentStatus } from '../enums';

export class GetPaymentDTO {
  @Min(0)
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  skip?: number;

  @Max(100)
  @Min(0)
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  take?: number;

  @IsEnum(PaymentStatus)
  @IsOptional()
  status?: PaymentStatus;

  @IsEnum(PaymentMethod)
  @IsOptional()
  method?: PaymentMethod;

  @IsNumber()
  @IsOptional()
  orderId?: number;

  @IsString()
  @IsOptional()
  search?: string;
}
