import { INestApplication, ModuleMetadata } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import * as supertest from 'supertest';

import { Config, configModuleOptions, postgresTypeOrmModuleOptions } from '@/config';

import { ProductModule } from '@/modules/product.module';
import { CategoryModule } from '@/modules/category.module';
import { OrderModule } from '@/modules/order.module';
import { CustomerModule } from '@/modules/customer.module';

interface IBeforeAllParameters {
  metadata?: ModuleMetadata;
  settingsOption?: string[];
}

export class TestFixture {
  appSettings: Config;

  module: TestingModule;

  httpClient: supertest.SuperTest<supertest.Test>;

  private app: INestApplication;

  async beforeAll(params?: IBeforeAllParameters): Promise<void> {
    // Force all connections to use localhost databases, instead of homologation / production.
    const moduleBuilder = Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(configModuleOptions),
        TypeOrmModule.forRootAsync(postgresTypeOrmModuleOptions),
        ProductModule,
        CategoryModule,
        OrderModule,
        CustomerModule,
        ...(params?.metadata?.imports ?? []),
      ],
      controllers: [...(params?.metadata?.controllers ?? [])],
      providers: [...(params?.metadata?.providers ?? [])],
      exports: [...(params?.metadata?.exports ?? [])],
    });

    this.module = await moduleBuilder.compile();

    this.app = this.module.createNestApplication();

    await this.app.init();

    this.httpClient = supertest(this.app.getHttpServer());
  }

  async afterAll(): Promise<void> {
    await this.app.close();
  }
}
