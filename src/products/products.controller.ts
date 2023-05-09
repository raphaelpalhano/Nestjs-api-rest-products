import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, ParseIntPipe, HttpCode } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      return this.productsService.create(createProductDto);
    } catch (err) {
      throw new HttpException({
        status: err.status,
        type: err.type,
        error: err.error,
      }, err.status, {
        cause: err
      });
    }
    
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.productsService.findOne(id);
    } catch (err) {
      throw new HttpException({
        status: err.status,
        type: err.type,
        error: err.error,
      }, err.status, {
        cause: err
      });
    }
    
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    try {
      return this.productsService.update(id, updateProductDto);
    } catch (err) {
      throw new HttpException({
        status: err.status,
        type: err.type,
        error: err.error,
      }, err.status, {
        cause: err
      });
    }
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id', new ParseIntPipe({
    errorHttpStatusCode: 422
  })) id: number) {
    try {
      return this.productsService.remove(id);
    } catch (err) {
      throw new HttpException({
        status: err.status,
        type: err.type,
        error: err.error,
      }, err.status, {
        cause: err
      });
    }
  }
}
