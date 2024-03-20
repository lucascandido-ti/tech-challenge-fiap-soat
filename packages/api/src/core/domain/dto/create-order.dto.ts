import { Customer, Product } from '@/core/domain/entities';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
} from 'class-validator';
import { PaymentMethod } from '../enums';

export class CreateOrderUseCaseDTO {
  @IsOptional()
  @IsObject()
  customer: Pick<Customer, 'id' | 'name' | 'email' | 'cpf'>;

  @ArrayMaxSize(1000)
  @ArrayNotEmpty()
  @IsArray()
  @IsOptional()
  products?: Pick<Product, 'id' | 'name' | 'description'>[];

  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  paymentMethod: PaymentMethod;
}

export class CreateOrderDTO {
  @IsOptional()
  @IsObject()
  customer: Customer;

  @ArrayMaxSize(1000)
  @ArrayNotEmpty()
  @IsArray()
  @IsOptional()
  products?: Product[];
}
