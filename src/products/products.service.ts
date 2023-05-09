import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService){}

  async create(createProductDto: CreateProductDto) {
    const totalPrice =  (createProductDto.product_price * createProductDto.product_quantity)
    const existPrice = await this.prisma.category.findUnique({
      where: {
        id: createProductDto.category_id
      }
    })
    console.log(existPrice)
    if(!existPrice){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        type: 'Not_found',
        error: 'This category doesnt exist!',
      },  HttpStatus.NOT_FOUND)
    }

    return this.prisma.product.create({
      data:{
        product_expiration_date: new Date(createProductDto.product_expiration_date).toISOString(),
        product_name: createProductDto.product_name,
        product_price: createProductDto.product_price,
        product_quantity: createProductDto.product_quantity,
        category_id: createProductDto.category_id,
        total_price: totalPrice
      }
    })
  }

  findAll() {
    return this.prisma.product.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id
      }
    });
    if(typeof id !== 'number' ||  id < 1) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        type: 'Invalid_param',
        error: 'Invalid param in request',
      },  HttpStatus.BAD_REQUEST)
    }
   
    if(!product){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        type: 'Not_found',
        error: 'Not found product',
      },  HttpStatus.NOT_FOUND)
    }
     return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    let expirationDate: string;
    const product = await this.prisma.product.findUnique({
      where: {
        id
      }
    });
    if(typeof id !== 'number' ||  id < 1) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        type: 'Invalid_param',
        error: 'Invalid param in request',
      },  HttpStatus.BAD_REQUEST)
    }
   
    if(!product){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        type: 'Not_found',
        error: 'Not found product',
      },  HttpStatus.NOT_FOUND)
    }
    if(updateProductDto.product_expiration_date){
      expirationDate = new Date(updateProductDto.product_expiration_date).toISOString()
    }
    return this.prisma.product.update({
      where: {
        id,
      },
      data: {
        product_expiration_date: expirationDate,
        product_name: updateProductDto.product_name,
        product_price: updateProductDto.product_price,
        product_quantity: updateProductDto.product_quantity,
        category_id: updateProductDto.category_id 

      }
        
      
    })
  }

  async remove(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id
      }
    });
    if(typeof id !== 'number' ||  id < 1) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        type: 'Invalid_param',
        error: 'Invalid param in request',
      },  HttpStatus.BAD_REQUEST)
    }
   
    if(!product){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        type: 'Not_found',
        error: 'Not found product',
      },  HttpStatus.NOT_FOUND)
    }
    return this.prisma.product.delete({
      where: {
        id
      }
    });
  }
}
