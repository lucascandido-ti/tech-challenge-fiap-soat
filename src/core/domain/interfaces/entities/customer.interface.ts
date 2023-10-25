import { CPF } from '../../value-objects/cpf.value-object';

export interface ICustomer {
  id: number;
  name: string;
  email: string;
  cpf: CPF;
}
