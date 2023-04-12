import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

export class ProductsRepository {

    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>) { }

    async findAll(): Promise<Product[]> {
        return await this.productsRepository.find();
    }

    async findOne(id: number): Promise<Product> {
        return await this.productsRepository.findOne(
            {
                where: {
                    id: id
                }
            }
        );
    }

    async create(product: CreateProductDto): Promise<Product> {
        const newProduct = this.productsRepository.create(product);
        return await this.productsRepository.save(newProduct);
    }

    async update(id: number, product: UpdateProductDto): Promise<Product> {

        const oldProduct = await this.productsRepository.preload(
            {
                id: id,
                ...product
            }
        );
        console.log(oldProduct)
        if (!oldProduct) {
            throw new NotFoundException(`Producto ${product.nombre} no encontrado.`);
        }

        return await this.productsRepository.save(oldProduct);
    }

    async filterByBrand(brand: string): Promise<Product[]> {
        return await this.productsRepository.findBy(
            {
                marca: brand.toLocaleLowerCase()
            }
        )
    }

    async filterByCategory(categoria: number): Promise<Product[]> {
        return await this.productsRepository.findBy(
            {
                tipo: categoria
            }
        )
    }

    async filterBySale(): Promise<Product[]> {
        return await this.productsRepository.findBy(
            {
                oferta: 1
            }
        )
    }
}