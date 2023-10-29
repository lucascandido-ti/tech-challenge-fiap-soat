import { TestFixture } from '..';
import { ICustomer } from '@/core/domain/interfaces';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '@/core/domain/entities';
import { POSTGRES_DATA_SOURCE } from '@/config';
import { CustomerUseCase } from '@/core/application';

describe('Customer', () => {
  const testFixture = new TestFixture();

  let customerUseCase: CustomerUseCase;

  beforeAll(async () => {
    await testFixture.beforeAll({
      metadata: {
        imports: [TypeOrmModule.forFeature([Customer], POSTGRES_DATA_SOURCE)],
      },
    });

    customerUseCase = testFixture.module.get(CustomerUseCase);
  });

  describe('Customer Module', () => {
    const customerTest: ICustomer = {
      name: 'User Test',
      email: 'test@example.com',
      cpf: '123.456.789.00',
    };
    beforeAll(async () => {
      console.log(customerTest);
      console.log(customerUseCase);
    });

    it('should be able to create a customer', async () => {
      const response = await customerUseCase.createCustomer(customerTest);

      expect(response).toHaveProperty('name', customerTest.name);
      expect(response).toHaveProperty('email', customerTest.email);
      expect(response).toHaveProperty('cpf', String(customerTest.cpf).replace(/[^a-zA-Z0-9]/g, ''));
    });
  });
});
