import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { POSTGRES_DATA_SOURCE } from '@/config';

import { Order } from '@/core/domain/entities';
import { IOrderRepositoryPort } from '@/core/domain/repositories';

@Injectable()
export class OrderRepository implements IOrderRepositoryPort {
  constructor(
    @InjectRepository(Order, POSTGRES_DATA_SOURCE)
    private readonly orderRepository: Repository<Order>,
  ) {}
  insert(_: Order): Promise<Order> {
    throw new Error('Method not implemented.');
  }
  findOneById(_: string | number): Promise<Order> {
    throw new Error('Method not implemented.');
  }
  async findAll(): Promise<Order[]> {
    return await this.orderRepository.findBy({});
  }
  delete(_: Order): Promise<DeleteResult> {
    throw new Error('Method not implemented.');
  }
}
