import { OrderStatus } from '../enums';
import { ICustomer } from './customer.interface';
import { IProduct } from './product.interface';

export interface IOrder {
  price: number;
  invoice: number;
  status: OrderStatus;
  customer: ICustomer;
  products: IProduct[];
  createdAt: Date;
}
