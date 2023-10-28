import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { POSTGRES_DATA_SOURCE } from '@/config';

import { Order } from '@/core/domain/entities';
import { IOrderRepositoryPort } from '@/core/domain/repositories';

@Injectable()
export class OrderRepository implements IOrderRepositoryPort {
  constructor(
    @InjectRepository(Order, POSTGRES_DATA_SOURCE)
    private readonly orderRepository: Repository<Order>,
  ) {}

  insert(order: Order): Promise<Order> {
    const newOrder = this.orderRepository.create(order);
    return this.orderRepository.save(newOrder);
  }

  async findAll(): Promise<Order[]> {
    const order = await this.orderRepository
      .createQueryBuilder('order')
      .innerJoinAndSelect('order.products', 'products')
      .innerJoinAndSelect('order.payment', 'payment')
      .innerJoinAndSelect('order.customer', 'customer')
      .getMany();

    return order;
  }

  async findOneById(id: number): Promise<Order> {
    const order = await this.orderRepository
      .createQueryBuilder('order')
      .innerJoinAndSelect('order.products', 'products')
      .innerJoinAndSelect('order.payment', 'payment')
      .innerJoinAndSelect('order.customer', 'customer')
      .where('order.id = :orderId', { orderId: id })
      .getOne();

    return order;
  }
}
