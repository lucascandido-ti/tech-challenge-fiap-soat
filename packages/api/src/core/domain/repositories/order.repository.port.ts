import { Order } from '../entities';
import { GetOrdersDTO } from '../dto';
import { RepositoryPort } from '../base';
import { IOrder, IPaginatedResponse } from '../interfaces';
import { OrderStatus } from '../enums';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IOrderRepositoryPort extends Omit<RepositoryPort<Order>, 'delete'> {
  getOrderBy(getOrdersDto: GetOrdersDTO): Promise<IPaginatedResponse<Order>>;
  findByCustomer(customerId: number): Promise<IOrder[]>;
  updateOrderStatus(orderId: number, status: OrderStatus): Promise<Order>;
}
