import { RepositoryPort } from '../base';
import { Payment } from '../entities';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IPaymentRepositoryPort extends Omit<RepositoryPort<Payment>, 'delete'> {}
