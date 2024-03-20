import { IsEnum, IsNotEmpty, IsObject } from 'class-validator';
import { Order } from '../entities';
import { PaymentMethod } from '../enums';

export class CreatePaymentDTO {
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  paymentMethod: PaymentMethod;

  @IsObject()
  @IsNotEmpty()
  order: Order;
}
