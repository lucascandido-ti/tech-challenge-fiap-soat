import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  MessageEvent,
  Param,
  Post,
  Query,
  Sse,
} from '@nestjs/common';

import { Observable, defer, distinctUntilKeyChanged, map, repeat } from 'rxjs';

import { CreateOrderUseCaseDTO, GetOrdersDTO } from '@/core/domain/dto';
import { IOrder, IOrderUseCase, IPaginatedResponse } from '@/core/domain/interfaces';
import { ApiOperationWithBody, ApiOperationWithParams } from '@/core/domain/decorators';

import { ORDER_USECASE } from '@/config';

@Controller('/order')
export class OrderController {
  constructor(
    @Inject(ORDER_USECASE)
    private readonly _orderUseCase: IOrderUseCase,
  ) {}

  @Sse(':id/events')
  sendEvent(@Param('id') id: number): Observable<MessageEvent> {
    return defer(() => this._orderUseCase.findOneById(id)).pipe(
      distinctUntilKeyChanged('status'),
      repeat({
        delay: 1000,
      }),
      map(report => ({
        type: 'message',
        data: report,
      })),
    );
  }

  @ApiOperationWithParams({
    summary: 'View All Orders',
    responseDescription: 'List Order',
  })
  @Get('/all')
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<IOrder[]> {
    return this._orderUseCase.findAll();
  }

  @ApiOperationWithParams({
    summary: 'View a Order',
    responseDescription: 'Find Order',
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOrdersById(@Param('id') id: number): Promise<IOrder> {
    return this._orderUseCase.findOneById(id);
  }

  @ApiOperationWithParams({
    summary: 'View Orders',
    responseDescription: 'List Order',
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getOrders(@Query() getOrdersDto: GetOrdersDTO): Promise<IPaginatedResponse<IOrder>> {
    return this._orderUseCase.getOrderBy(getOrdersDto);
  }

  @ApiOperationWithBody({
    summary: 'Create Order',
    responseDescription: 'Customer created successfully',
    requestBodyType: CreateOrderUseCaseDTO,
  })
  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async insert(@Body() createOrderDTO: CreateOrderUseCaseDTO): Promise<IOrder> {
    return this._orderUseCase.createOrder(createOrderDTO);
  }
}
