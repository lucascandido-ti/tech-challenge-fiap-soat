import { ICustomer } from '@/core/domain/interfaces';
import { IsCPF } from '@/core/domain/decorators';
import { IsEmail, IsOptional, IsString } from 'class-validator';

const message =
  'CPF must contain only numbers and up to 11 digits, or contain the following format: 123.456.789-00';

export class CreateCustomerDTO implements ICustomer {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsCPF({ message: message })
  @IsOptional()
  cpf: number | string;
}
