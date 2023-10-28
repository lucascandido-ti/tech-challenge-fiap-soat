import { CreatePaymentDTO } from '../../dto';
import { Payment } from '../../entities';
import { IPayment } from '../entities';

export interface IPaymentUseCase {
  findAll(): Promise<IPayment[]>;
  createPayment(createPaymentDto: CreatePaymentDTO): Promise<Payment>;
}
