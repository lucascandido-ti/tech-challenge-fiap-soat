import { CreatePaymentDTO } from '../../dto';
import { Payment } from '../../entities';
import { IPayment } from '../entities';

export interface IPaymentUseCase {
  findAll(): Promise<IPayment[]>;
  findById(paymentId: number): Promise<IPayment>;
  createPayment(createPaymentDto: CreatePaymentDTO): Promise<Payment>;
  getPaymentByOrder(orderId: number, customerId: number): Promise<IPayment>;
  getPaymentStatus(paymentId: number): Promise<Pick<Payment, 'id' | 'paymentStatus' | 'createdAt'>>;
}
