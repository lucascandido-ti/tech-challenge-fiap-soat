import { ProductModule } from './modules/product.module';
import { CustomerModule } from './modules/customer.module';
import { ClassSerializerInterceptor, Module, Provider, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';

import {
  configModuleOptions,
  throttlerModuleOptions,
  postgresTypeOrmModuleOptions,
  cacheModuleOptions,
} from './config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { CacheInterceptor, ExceptionFilter } from './core/domain/middlewares';
import { CacheModule } from '@nestjs/cache-manager';

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
    CustomerModule,
    ProductModule,
  ],
  controllers: [...httpControllers],
  providers: [...repositories],
})
export class AppModule {}
