import { ApiProperty } from '@nestjs/swagger';

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
import { CreateCustomerDTO } from '../dto';

export interface ICustomerProps extends ICustomer {
  id: number;
  createdAt?: Date;
}
@TypeOrmEntity()
export class Customer extends Entity<number> {
  constructor(id?: number, cpf?: CPF, email?: string, name?: string, createdAt = new Date()) {
    super(id);
    this.cpf = cpf;
    this.email = email;
    this.name = name;
    this.createdAt = createdAt;
  }

  @ApiProperty({ example: 'ID' })
  @PrimaryColumn('int8', { nullable: false, generated: true, primary: true })
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

  static create(create: CreateCustomerDTO): Customer {
    const id = undefined;
    const customer = new Customer(id, create.cpf, create.email, create.name);
    return customer;
  }
}
