import { Price } from '../../value-objects';
import { ICategory } from './category.interface';
import { IOrder } from './order.interface';

export interface IProduct {
  name: string;
  description: string;
  price: Price;
  orders: IOrder[];
  categories: ICategory[];
  createdAt: Date;
}
