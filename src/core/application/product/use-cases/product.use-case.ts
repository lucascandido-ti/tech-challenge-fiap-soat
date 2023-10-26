import { CATEGORY_REPOSITORY, PRODUCT_REPOSITORY } from '@/config';
import { IPaginatedResponse, IProduct, IProductUseCase } from '@/core/domain/interfaces';
import { ICategoryRepositoryPort, IProductRepositoryPort } from '@/core/domain/repositories';
import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDTO, GetProductDTO, UpdateProductDTO } from '../dto';
import { Product } from '@/core/domain/entities';

@Injectable()
export class ProductUseCase implements IProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly _productRepository: IProductRepositoryPort,
    @Inject(CATEGORY_REPOSITORY)
    private readonly _categoryRepository: ICategoryRepositoryPort,
  ) {}

  async getProductsBy(getProductsDTO: GetProductDTO): Promise<IPaginatedResponse<IProduct>> {
    return await this._productRepository.getProductsBy(getProductsDTO);
  }

  async createProduct({
    name,
    description,
    price,
    categoryIds,
  }: CreateProductDTO): Promise<IProduct> {
    const categories = await this._categoryRepository.findByIds(categoryIds);

    if (!categories.length) throw new Error('No ID categories');

    const product = Product.create({ name, description, price, categories: categories });
    return await this._productRepository.insert(product);
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
}
