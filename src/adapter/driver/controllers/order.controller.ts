import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { ORDER_USECASE } from '@/config';
import { ApiOperationWithBody, ApiOperationWithParams } from '@/core/domain/decorators';
import { IOrder, IOrderUseCase, IPaginatedResponse } from '@/core/domain/interfaces';
import { CreateOrderDTO, GetOrdersDTO } from '@/core/domain/dto';

@Controller('/order')
export class OrderController {
  constructor(
    @Inject(ORDER_USECASE)
    private readonly _orderUseCase: IOrderUseCase,
  ) {}

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
    requestBodyType: CreateOrderDTO,
  })
  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async insert(@Body() createOrderDTO: CreateOrderDTO): Promise<IOrder> {
    return this._orderUseCase.createOrder(createOrderDTO);
  }
}
