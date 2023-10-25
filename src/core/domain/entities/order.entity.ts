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
  Entity as TypeOrmEntity,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Customer } from './customer.entity';
import { Payment } from './payment.entity';
import { OrderStatus } from '../enums';

@TypeOrmEntity()
export class Order extends Entity<number> {
  @PrimaryColumn('int8', { nullable: false })
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

  @ManyToMany(() => Product, product => product.orders)
  @JoinTable({
    name: 'productOrder',
    joinColumn: { name: 'orderId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'productId', referencedColumnName: 'id' },
  })
  products: Product[];

  @OneToOne(() => Payment, payment => payment.order)
  payment: Payment;

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt: Date;
}
