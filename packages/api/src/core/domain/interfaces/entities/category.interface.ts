import { IProduct } from './product.interface';

export interface ICategory {
  name: string;
  description: string;
  products: IProduct[];
  createdAt: Date;
}
