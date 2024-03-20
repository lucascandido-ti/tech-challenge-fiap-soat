import { ICategory } from './category.interface';
import { IOrder } from './order.interface';

export interface IProduct {
  name: string;
  description: string;
  price: number;
  orders: IOrder[];
  categories: ICategory[];
  createdAt: Date;
}
