import { Entity } from '@/core/domain/base';
import {
  Column,
  CreateDateColumn,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  Relation,
  Entity as TypeOrmEntity,
  UpdateDateColumn,
} from 'typeorm';

import { OrderStatus } from '../enums';

import { Product } from './product.entity';
import { Payment } from './payment.entity';
import { Customer } from './customer.entity';

import { IOrder } from '../interfaces/entities';
import { CreateOrderDTO } from '../dto';

@TypeOrmEntity()
export class Order extends Entity<number> implements IOrder {
  constructor(id?: number, customer?: Customer, products?: Product[], createdAt = new Date()) {
    super(id);
    this.customer = customer;
    this.products = products;
    this.createdAt = createdAt;
  }

  @PrimaryColumn('int8', { nullable: false, generated: true, primary: true })
  id: number;

  @Column('float8', { nullable: false })
  price: number;

  @Column('int8', { nullable: true })
  invoice: number;

  @Column('varchar', { nullable: false, default: OrderStatus.RECEIVED })
  status: OrderStatus;

  @ManyToOne(() => Customer, customer => customer.orders)
  @JoinColumn({
    name: 'customerId',
    referencedColumnName: 'id',
  })
  customer: Customer;

  @ManyToMany(() => Product, product => product.orders, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    orphanedRowAction: 'disable',
  })
  @JoinTable({
    name: 'productOrder',
    joinColumn: { name: 'orderId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'productId', referencedColumnName: 'id' },
  })
  products: Product[];

  @OneToOne(() => Payment, payment => payment.order)
  payment: Relation<Payment>;

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt: Date;

  static create(create: CreateOrderDTO): Order {
    const id = this.prototype.id;
    const { customer, products } = create;

    const order = new Order(id, customer, products);

    order.status = OrderStatus.RECEIVED;
    Order.calculateTotalPrice(order);

    return order;
  }

  static calculateTotalPrice(order: Order): void {
    const total = order.products.reduce((acc, product) => {
      return acc + product.price;
    }, 0);
    order.price = total;
  }
}
