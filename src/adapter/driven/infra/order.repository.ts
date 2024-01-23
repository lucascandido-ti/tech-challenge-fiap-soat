import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { POSTGRES_DATA_SOURCE } from '@/config';

import { Order } from '@/core/domain/entities';
import { IOrderRepositoryPort } from '@/core/domain/repositories';
import { IOrder, IPaginatedResponse } from '@/core/domain/interfaces';
import { GetOrdersDTO } from '@/core/domain/dto';
import { OrderStatus } from '@/core/domain/enums';

@Injectable()
export class OrderRepository implements IOrderRepositoryPort {
  constructor(
    @InjectRepository(Order, POSTGRES_DATA_SOURCE)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getOrderBy({
    skip,
    take,
    search,
    orderId,
    customerId,
    status,
  }: GetOrdersDTO): Promise<IPaginatedResponse<IOrder>> {
    const queryBuilder = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.customer', 'customer')
      .leftJoinAndSelect('order.payment', 'payment')
      .where('order.status <> :status', { status: OrderStatus.FINISHED })
      .skip(skip)
      .take(take);

    if (search)
      queryBuilder.andWhere(
        '(order.status LIKE :search OR LOWER(customer.name) LIKE LOWER(:search))',
        {
          search: `%${search.toLowerCase()}%`,
        },
      );

    if (orderId) {
      queryBuilder.andWhere('order.id = :id', {
        id: orderId,
      });
    }

    if (customerId) {
      queryBuilder.andWhere('customer.id = :customerId', {
        customerId: customerId,
      });
    }

    if (status) {
      queryBuilder.andWhere('order.status = :status', {
        status: status,
      });
    }

    const ordersCount = await queryBuilder.getCount();
    const orders = await queryBuilder.getMany();

    orders.sort(this.sortOrders);

    return { data: orders, total: ordersCount };
  }

  sortOrders(a: Order, b: Order) {
    const statusOrder = {
      [OrderStatus.CONCLUDED]: 0,
      [OrderStatus.IN_PREPARATION]: 1,
      [OrderStatus.RECEIVED]: 2,
    };

    const statusComparison = statusOrder[a.status] - statusOrder[b.status];
    if (statusComparison !== 0) {
      return statusComparison;
    }

    const dateComparison = a.createdAt.getTime() - b.createdAt.getTime();
    if (dateComparison !== 0) {
      return dateComparison;
    }

    return 0;
  }

  findByCustomer(customerId: number): Promise<IOrder[]> {
    return this.orderRepository.findBy({ customer: { id: customerId } });
  }

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
