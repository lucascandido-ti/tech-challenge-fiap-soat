import { CUSTOMER_USECASE } from '@/config/dependecy-injection';
import { CreateCustomerDTO } from '@/core/application/customer/dto';
import { ICustomer, ICustomerUseCase } from '@/core/domain/interfaces';
import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
@Controller('customer')
export class CustomerController {
  constructor(
    @Inject(CUSTOMER_USECASE)
    private readonly _customerUseCase: ICustomerUseCase,
  ) {}

  @ApiOperation({ summary: 'View Customers' })
  @ApiResponse({
    description: 'List All Customers',
    status: HttpStatus.OK,
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<ICustomer[]> {
    return this._customerUseCase.findAll();
  }

  @ApiOperation({
    summary: 'Create a new Customers',
  })
  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async insert(@Body() createCustomerDTO: CreateCustomerDTO): Promise<ICustomer> {
    return this._customerUseCase.createCustomer(createCustomerDTO);
  }
}
