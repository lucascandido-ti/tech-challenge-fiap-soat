import { Inject, Injectable } from '@nestjs/common';

import { IOrder, IOrderUseCase, IPaymentUseCase } from '@/core/domain/interfaces';
import {
  ICustomerRepositoryPort,
  IOrderRepositoryPort,
  IProductRepositoryPort,
} from '@/core/domain/repositories';
import {
  CUSTOMER_REPOSITORY,
  ORDER_REPOSITORY,
  PAYMENT_USECASE,
  PRODUCT_REPOSITORY,
} from '@/config';
import { Order } from '@/core/domain/entities';
import { CreateOrderUseCaseDTO } from '@/core/domain/dto';
import { PaymentMethod } from '@/core/domain/enums';

@Injectable()
export class OrderUseCase implements IOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly _orderRepository: IOrderRepositoryPort,
    @Inject(CUSTOMER_REPOSITORY)
    private readonly _customerRepository: ICustomerRepositoryPort,
    @Inject(PRODUCT_REPOSITORY)
    private readonly _productRepository: IProductRepositoryPort,
    @Inject(PAYMENT_USECASE)
    private readonly _paymentUseCase: IPaymentUseCase,
  ) {}

  async findOneById(id: number): Promise<IOrder> {
    return await this._orderRepository.findOneById(id);
  }

  async findAll(): Promise<IOrder[]> {
    return await this._orderRepository.findAll();
  }

  async createOrder({ customer, products }: CreateOrderUseCaseDTO): Promise<IOrder> {
    const _customer = await this._customerRepository.findOneById(customer.id);
    if (!_customer) throw new Error('Customer not found');

    const productIds = products.map(({ id }) => id);
    const _products = (await this._productRepository.getProductsBy({ productIds: productIds }))
      .data;
    if (!_products) throw new Error('Products not found');

    const order = await this._orderRepository.insert(
      Order.create({ customer: _customer, products: _products }),
    );

    order.payment = await this._paymentUseCase.createPayment({
      order,
      paymentMethod: PaymentMethod.QRCode,
    });

    return order;
  }
}
