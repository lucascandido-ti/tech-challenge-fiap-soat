import { TestFixture } from '..';
import { ICustomer } from '@/core/domain/interfaces';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Customer } from '@/core/domain/entities';
import { POSTGRES_DATA_SOURCE } from '@/config';
import { CustomerUseCase } from '@/core/application';
import { Repository } from 'typeorm';

describe('Customer', () => {
  const testFixture = new TestFixture();

  let customerUseCase: CustomerUseCase;
  let customerRepository: Repository<Customer>;

  beforeAll(async () => {
    await testFixture.beforeAll({
      metadata: {
        imports: [TypeOrmModule.forFeature([Customer], POSTGRES_DATA_SOURCE)],
      },
    });

    customerUseCase = testFixture.module.get(CustomerUseCase);
    customerRepository = testFixture.module.get(getRepositoryToken(Customer, POSTGRES_DATA_SOURCE));
  });

  describe('Customer Module', () => {
    const customerTest: ICustomer = {
      name: 'User Test',
      email: 'test@example.com',
      cpf: '123.456.789.00',
    };

    afterAll(async () => {
      const customer = await customerRepository
        .createQueryBuilder('customer')
        .where('customer.name = :customerName', { customerName: 'User Test' })
        .getOneOrFail();
      if (!customer) return;

      console.log('customer', customer);
      await customerRepository.delete(customer.id);
    });

    it('should be able to create a customer', async () => {
      const response = await customerUseCase.createCustomer(customerTest);

      expect(response).toHaveProperty('name', customerTest.name);
      expect(response).toHaveProperty('email', customerTest.email);
      expect(response).toHaveProperty('cpf', String(customerTest.cpf).replace(/[^a-zA-Z0-9]/g, ''));
    });
  });
});
