import { Entity } from '@/core/domain/base';
import {
  Column,
  CreateDateColumn,
  ManyToMany,
  PrimaryColumn,
  Entity as TypeOrmEntity,
  UpdateDateColumn,
} from 'typeorm';

import { Order } from './order.entity';
import { Category } from './category.entity';

import { Price } from '../value-objects';
import { IProduct } from '../interfaces/entities';
import { CreateProductDTO } from '@/core/application/product/dto';

@TypeOrmEntity()
export class Product extends Entity<number> implements IProduct {
  constructor(
    id?: number,
    name?: string,
    description?: string,
    price?: Price,
    categories?: Category[],
    createdAt = new Date(),
  ) {
    super(id);
    this.name = name;
    this.description = description;
    this.price = price;
    this.categories = categories;
    this.createdAt = createdAt;
  }

  @PrimaryColumn('int8', { nullable: false, generated: true, primary: true })
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

  @ManyToMany(() => Category, category => category.products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  categories: Category[];

  static create(create: CreateProductDTO): Product {
    const id = this.prototype.id;
    const { name, description, price, categories } = create;
    const product = new Product(id, name, description, price, categories);
    return product;
  }
}
