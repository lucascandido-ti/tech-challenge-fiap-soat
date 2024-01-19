import { Entity } from '@/core/domain/base';
import {
  Column,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  Relation,
  Entity as TypeOrmEntity,
  UpdateDateColumn,
} from 'typeorm';

import { PaymentMethod, PaymentStatus } from '../enums';

import { Order } from './order.entity';

import { IPayment } from '../interfaces/entities';
import { CreatePaymentDTO } from '../dto';

@TypeOrmEntity()
export class Payment extends Entity<number> implements IPayment {
  @PrimaryColumn('int8', { nullable: false, generated: true, primary: true })
  id: number;

  @Column('varchar', { nullable: false, default: PaymentMethod.QRCode })
  paymentMethod: PaymentMethod;

  @Column('varchar', { nullable: false, default: PaymentStatus.PENDING })
  paymentStatus: PaymentStatus;

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt: Date;

  @OneToOne(() => Order, order => order.payment)
  @JoinColumn([{ name: 'orderId', referencedColumnName: 'id' }])
  order: Relation<Order>;

  constructor(id?: number, order?: Order, paymentMethod?: PaymentMethod) {
    super(id);
    this.order = order;
    this.paymentMethod = paymentMethod;
    this.createdAt = new Date();
  }

  static create(create: CreatePaymentDTO): Payment {
    const id = this.prototype.id;
    const { order, paymentMethod } = create;
    const payment = new Payment(id, order, paymentMethod);
    payment.paymentStatus = PaymentStatus.PENDING;

    return payment;
  }
}
