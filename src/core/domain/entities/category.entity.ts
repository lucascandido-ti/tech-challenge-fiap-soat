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

import { Product } from './product.entity';
import { CreateCategoryDTO } from '../dto/create-category.dto';

@TypeOrmEntity()
export class Category extends Entity<number> {
  @PrimaryColumn('int8', { nullable: false, generated: true, primary: true })
  id: number;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: false })
  description: string;

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt: Date;

  @ManyToMany(() => Product, product => product.categories, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'productCategory',
    joinColumn: { name: 'categoryId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'productId', referencedColumnName: 'id' },
  })
  products: Product[];

  constructor(id?: number, name?: string, description?: string) {
    super(id);

    this.name = name;
    this.description = description;
  }

  static create(create: CreateCategoryDTO): Category {
    const id = this.prototype.id;
    const { name, description } = create;
    const category = new Category(id, name, description);
    return category;
  }
}
