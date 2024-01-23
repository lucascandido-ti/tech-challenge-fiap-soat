import { RepositoryPort } from '../base';
import { Payment } from '../entities';
import { IPayment } from '../interfaces';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IPaymentRepositoryPort extends Omit<RepositoryPort<Payment>, 'delete'> {
  getPaymentByOrder(orderId: number, customerId: number): Promise<IPayment>;
  getStatus(paymentId: number): Promise<Pick<Payment, 'id' | 'paymentStatus' | 'createdAt'>>;
}
