import {
  Column,
  CreateDateColumn,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  Entity as TypeOrmEntity,
  UpdateDateColumn,
} from 'typeorm';

import { Entity } from '../base';
import { ICategory } from '../interfaces/entities';

import { Product } from './product.entity';

@TypeOrmEntity()
export class Category extends Entity<number> implements ICategory {
  @PrimaryColumn('int8', { nullable: false })
  id: number;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: false })
  description: string;

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt: Date;

  @ManyToMany(() => Product, product => product.categories)
  @JoinTable({
    name: 'productCategory',
    joinColumn: { name: 'categoryId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'productId', referencedColumnName: 'id' },
  })
  products: Product[];
}
