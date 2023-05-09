import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe({
    errorHttpStatusCode: 422
  })) id: number) {
    try {
      return this.categoriesService.findOne(id);
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
  update(@Param('id', 
  new ParseIntPipe({ errorHttpStatusCode: 422}))
   id: number, 
   @Body() updateCategoryDto: UpdateCategoryDto) {
    try {
      return this.categoriesService.update(id, updateCategoryDto);
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

  @Delete(':id')
  remove(@Param('id', 
  new ParseIntPipe({
    errorHttpStatusCode: 422
  }))
   id: number) {
    try {
      return this.categoriesService.remove(id);
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
