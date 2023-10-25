import { ICustomer } from '@/core/domain/interfaces';
import { IsCPF } from '@/core/domain/decorators';
import { CPF } from '@/core/domain/value-objects';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateCustomerDTO implements ICustomer {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsCPF()
  @IsOptional()
  cpf: CPF;
}
