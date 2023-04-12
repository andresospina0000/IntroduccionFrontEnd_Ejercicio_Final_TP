import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {

  constructor(private readonly productsRepository: ProductsRepository) { }

  async create(createProductDto: CreateProductDto) {
    createProductDto.marca = createProductDto.marca.toLowerCase().trim();
    return await this.productsRepository.create(createProductDto);
  }

  async findAll() {
    return await this.productsRepository.findAll();
  }

  async filterByCategory(category: number) {
    return await this.productsRepository.filterByCategory(category);
  }


  async filterByBrand(brand: string) {
    return await this.productsRepository.filterByBrand(brand);
  }

  async filterBySale() {
    return await this.productsRepository.filterBySale();
  }

  async findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    updateProductDto.marca = updateProductDto.marca.toLowerCase().trim();
    return this.productsRepository.update(id, updateProductDto);
  }

  async remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
