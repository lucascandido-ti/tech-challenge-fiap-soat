import { CUSTOMER_USECASE } from '@/config/dependecy-injection';
import { ICustomer, ICustomerUseCase } from '@/core/domain/interfaces';
import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common';

@Controller('customer')
export class CustomerController {
  constructor(
    @Inject(CUSTOMER_USECASE)
    private readonly _customerUseCase: ICustomerUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getCustomers(): Promise<ICustomer[]> {
    return this._customerUseCase.getCustomers();
  }
}
