import { Order } from './order.entity';
import { Product } from './product.entity';
import { Payment } from './payment.entity';
import { Category } from './category.entity';
import { Customer } from './customer.entity';

export { Customer, Order, Product, Category, Payment };

export const ENTITIES = [Customer, Order, Product, Category, Payment];

export type Entities = typeof ENTITIES;
