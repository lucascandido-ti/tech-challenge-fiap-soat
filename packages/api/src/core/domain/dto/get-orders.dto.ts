import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

import { IPaginatedRequest } from '@/core/domain/interfaces';
import { OrderStatus, PaymentStatus } from '../enums';

export class GetOrdersDTO implements IPaginatedRequest {
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

  @IsString()
  @IsOptional()
  search?: string;

  @IsNumber()
  @IsOptional()
  orderId?: number;

  @IsNumber()
  @IsOptional()
  customerId?: number;

  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @IsEnum(PaymentStatus)
  @IsOptional()
  paymentStatus?: PaymentStatus;
}
