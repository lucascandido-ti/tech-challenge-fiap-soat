import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ClassSerializerInterceptor, Module, Provider, ValidationPipe } from '@nestjs/common';

import { CacheInterceptor, ExceptionFilter } from './core/domain/middlewares';

import {
  configModuleOptions,
  throttlerModuleOptions,
  postgresTypeOrmModuleOptions,
  cacheModuleOptions,
} from './config';

import {
  OrderModule,
  CategoryModule,
  CustomerModule,
  ProductModule,
  PaymentModule,
} from './modules';

const httpControllers = [];
const repositories: Provider[] = [
  {
    provide: APP_FILTER,
    useClass: ExceptionFilter,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: CacheInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor,
  },
  {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  },
];

@Module({
  imports: [
    CacheModule.register(cacheModuleOptions),
    ConfigModule.forRoot(configModuleOptions),
    ThrottlerModule.forRootAsync(throttlerModuleOptions),
    TypeOrmModule.forRootAsync(postgresTypeOrmModuleOptions),
    OrderModule,
    CustomerModule,
    ProductModule,
    CategoryModule,
    PaymentModule,
  ],
  controllers: [...httpControllers],
  providers: [...repositories],
})
export class AppModule {}
