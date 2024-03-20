import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

export interface IException {
  httpException(): HttpException;
}

@Catch()
export class ExceptionFilter extends BaseExceptionFilter {
  override catch(exception: unknown, host: ArgumentsHost) {
    if ((exception as IException).httpException) {
      const httpException = (exception as IException).httpException();

      super.catch(httpException, host);
    } else super.catch(exception, host);
  }
}
