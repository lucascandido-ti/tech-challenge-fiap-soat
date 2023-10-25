import { Entity } from '@/core/domain/base';
import {
  Column,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  Entity as TypeOrmEntity,
  UpdateDateColumn,
} from 'typeorm';
import { PaymentMethod, PaymentStatus } from '../enums';
import { Order } from './order.entity';

@TypeOrmEntity()
export class Payment extends Entity<number> {
  @PrimaryColumn('int8', { nullable: false })
  id: number;

  @Column('varchar', { nullable: false, default: PaymentMethod.QRCode })
  paymentMethod: PaymentMethod;

  @Column('varchar', { nullable: false, default: PaymentStatus.PENDING })
  paymentStatus: PaymentStatus;

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt: Date;

  @OneToOne(() => Order, order => order.payment, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({
    name: 'orderId',
    referencedColumnName: 'id',
  })
  order: Order;
}