import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService){}

  create(createProductDto: CreateProductDto) {
    return this.prisma.products.create({
      data:{
        product_category: createProductDto.product_category,
        product_expiration_date: new Date(createProductDto.product_expiration_date).toISOString(),
        product_name: createProductDto.product_name,
        product_price: createProductDto.product_price,
        product_quantity: createProductDto.product_quantity
      }
    })
  }

  findAll() {
    return this.prisma.products.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
