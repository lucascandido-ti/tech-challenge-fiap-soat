import { Entity } from '@/core/domain/base';
import {
  Column,
  CreateDateColumn,
  ManyToMany,
  PrimaryColumn,
  Entity as TypeOrmEntity,
  UpdateDateColumn,
} from 'typeorm';
import { Price } from '../value-objects';
import { Category } from './category.entity';
import { Order } from './order.entity';

@TypeOrmEntity()
export class Product extends Entity<number> {
  @PrimaryColumn('int8', { nullable: false })
  id: number;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: false })
  description: string;

  @Column('float8', { nullable: false })
  price: Price;

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt: Date;

  @ManyToMany(() => Order, order => order.products)
  orders: Order[];

  @ManyToMany(() => Category, category => category.products)
  categories: Category[];
}
