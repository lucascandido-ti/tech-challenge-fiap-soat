import { PaymentMethod, PaymentStatus } from '../../enums';
import { IOrder } from './order.interface';

export interface IPayment {
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  order: IOrder;
  createdAt: Date;
}
