import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService){}

  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: createCategoryDto
    })
  }

  findAll() {
    return this.prisma.category.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.category.findUnique({
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

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const product = await this.prisma.category.findUnique({
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
        error: 'Not found category',
      },  HttpStatus.NOT_FOUND)
    }
    return this.prisma.category.update({
      where: {
        id,
      },
      data: updateCategoryDto
      
    })
  }

  async remove(id: number) {
    const product = await this.prisma.category.findUnique({
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
    return this.prisma.category.delete({
      where: {
        id
      }
    });
  }
}
