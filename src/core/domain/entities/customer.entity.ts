import {
  Column,
  CreateDateColumn,
  OneToMany,
  PrimaryColumn,
  Entity as TypeOrmEntity,
  UpdateDateColumn,
} from 'typeorm';

import { Order } from './order.entity';

import { ICustomer } from '../interfaces/entities';

import { Entity } from '@/core/domain/base';
import { CPF } from '@/core/domain/value-objects';

@TypeOrmEntity()
export class Customer extends Entity<number> implements ICustomer {
  @PrimaryColumn('int8', { nullable: false })
  id: number;

  @Column('varchar', { nullable: true })
  name: string;

  @Column('varchar', { nullable: true })
  email: string;

  @Column('varchar', { nullable: true })
  cpf: CPF;

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt: Date;

  @OneToMany(() => Order, order => order.customer)
  orders: Order[];
}
