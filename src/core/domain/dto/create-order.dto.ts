import { Customer, Product } from '@/core/domain/entities';
import { ArrayMaxSize, ArrayNotEmpty, IsArray, IsObject, IsOptional } from 'class-validator';

export class CreateOrderUseCaseDTO {
  @IsOptional()
  @IsObject()
  customer: Pick<Customer, 'id' | 'name' | 'email' | 'cpf'>;

  @ArrayMaxSize(1000)
  @ArrayNotEmpty()
  @IsArray()
  @IsOptional()
  products?: Pick<Product, 'id' | 'name' | 'description'>[];
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
