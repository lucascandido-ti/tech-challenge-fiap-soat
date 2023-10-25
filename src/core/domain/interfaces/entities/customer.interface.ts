import { CPF } from '../../value-objects/cpf.value-object';

export interface ICustomer {
  name: string;
  email: string;
  cpf: CPF;
}
