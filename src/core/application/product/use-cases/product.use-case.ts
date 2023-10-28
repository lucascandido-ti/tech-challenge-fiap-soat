import { Inject, Injectable } from '@nestjs/common';

import { DeleteResult } from 'typeorm';

import { CATEGORY_REPOSITORY, PRODUCT_REPOSITORY } from '@/config';

import { Product } from '@/core/domain/entities';
import { IPaginatedResponse, IProduct, IProductUseCase } from '@/core/domain/interfaces';
import { ICategoryRepositoryPort, IProductRepositoryPort } from '@/core/domain/repositories';
import { CreateProductDTO, GetProductDTO, UpdateProductDTO } from '@/core/domain/dto';

@Injectable()
export class ProductUseCase implements IProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly _productRepository: IProductRepositoryPort,
    @Inject(CATEGORY_REPOSITORY)
    private readonly _categoryRepository: ICategoryRepositoryPort,
  ) {}

  async getProductsBy(getProductsDTO: GetProductDTO): Promise<IPaginatedResponse<Product>> {
    return await this._productRepository.getProductsBy(getProductsDTO);
  }

  async createProduct(createProducts: CreateProductDTO[]): Promise<IProduct | IProduct[]> {
    const products: Product[] = [];

    for await (const createProduct of createProducts) {
      const categories = await this._categoryRepository.findByIds(createProduct.categoryIds);
      createProduct;
      if (!categories.length) throw new Error('No ID categories');

      const product = Product.create({
        name: createProduct.name,
        description: createProduct.description,
        price: createProduct.price,
        categories: categories,
      });

      products.push(product);
    }

    for await (const product of products) {
      await this._productRepository.insert(product);
    }

    return products;
  }

  async findAll(): Promise<IProduct[]> {
    return await this._productRepository.findAll();
  }

  async updateProduct({
    id,
    name,
    description,
    price,
    categoryIds,
  }: UpdateProductDTO): Promise<IProduct> {
    const product = await this._productRepository.findOneById(id);
    if (!product) throw new Error('No found product');

    if (categoryIds) {
      const categories = await this._categoryRepository.findByIds(categoryIds);
      product.categories = categories;
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;

    const updatedProduct = Product.create({ ...product });
    updatedProduct.id = product.id;

    return await this._productRepository.insert(updatedProduct);
  }

  async delete(id: number): Promise<DeleteResult> {
    const product = await this._productRepository.findOneById(id);
    return await this._productRepository.delete(product);
  }
}
