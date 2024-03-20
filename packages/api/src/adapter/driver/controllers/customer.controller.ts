import { CUSTOMER_USECASE } from '@/config/dependecy-injection';
import { ApiOperationWithBody, ApiOperationWithParams } from '@/core/domain/decorators';
import { CreateCustomerDTO, GetCustomersDTO } from '@/core/domain/dto';
import { ICustomer, ICustomerUseCase, IPaginatedResponse } from '@/core/domain/interfaces';
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
import { Roles } from 'nest-keycloak-connect';

@Controller('/customer')
export class CustomerController {
  constructor(
    @Inject(CUSTOMER_USECASE)
    private readonly _customerUseCase: ICustomerUseCase,
  ) {}

  @ApiOperationWithParams({
    summary: 'View Customers',
    responseDescription: 'List Customers',
    queryParameters: [
      { name: 'skip', description: 'Number of items to be skipped' },
      { name: 'take', description: 'Number of items to be listed' },
      { name: 'search', description: 'Live field for search' },
    ],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles({ roles: ['user'] })
  async getCustomers(
    @Query() getCustomersDto: GetCustomersDTO,
  ): Promise<IPaginatedResponse<ICustomer>> {
    return this._customerUseCase.getCustomersBy(getCustomersDto);
  }

  @ApiOperationWithParams({
    summary: 'View Customer',
    responseDescription: 'List Customer',
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getCustomer(@Param('id') id: number): Promise<ICustomer> {
    return this._customerUseCase.findById(id);
  }

  @ApiOperationWithBody({
    summary: 'Create Customer',
    responseDescription: 'Customer created successfully',
    requestBodyType: CreateCustomerDTO,
  })
  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async insert(@Body() createCustomerDTO: CreateCustomerDTO): Promise<ICustomer> {
    return this._customerUseCase.createCustomer(createCustomerDTO);
  }
}
