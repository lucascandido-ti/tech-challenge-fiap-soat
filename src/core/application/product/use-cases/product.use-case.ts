import { IProduct, IProductUseCase } from '@/core/domain/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductUseCase implements IProductUseCase {
  findAll(): Promise<IProduct[]> {
    throw new Error('Method not implemented.');
  }
}
