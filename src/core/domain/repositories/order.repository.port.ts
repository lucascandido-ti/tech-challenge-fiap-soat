import { RepositoryPort } from '../base';
import { Order } from '../entities';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IOrderRepositoryPort extends Omit<RepositoryPort<Order>, 'delete'> {}
