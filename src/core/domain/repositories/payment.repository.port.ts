import { RepositoryPort } from '../base';
import { GetPaymentDTO } from '../dto';
import { Payment } from '../entities';
import { IPaginatedResponse, IPayment } from '../interfaces';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IPaymentRepositoryPort extends Omit<RepositoryPort<Payment>, 'delete'> {
  getPaymentBy(getPaymentDto: GetPaymentDTO): Promise<IPaginatedResponse<Payment>>;
  getPaymentByOrder(orderId: number, customerId: number): Promise<IPayment>;
  getStatus(paymentId: number): Promise<Pick<Payment, 'id' | 'paymentStatus' | 'createdAt'>>;
  updatePaymentStatus(paymentId: number): Promise<Payment>;
}
