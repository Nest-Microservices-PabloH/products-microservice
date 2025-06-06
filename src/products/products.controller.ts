import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { PaginationDto } from '../common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService
  ) { }

  // @Post()
  @MessagePattern({ cmd: 'createProduct' })
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // @Get()
  @MessagePattern({ cmd: 'findAllProducts' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  // @Get(':id')
  @MessagePattern({ cmd: 'findOneProduct' })
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  // @Delete(':id')
  @MessagePattern({ cmd: 'deleteProduct' })
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  // @Patch(':id')
  @MessagePattern({ cmd: 'updateProduct' })
  update(
    @Payload() updateProductDto: UpdateProductDto
  ) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }


  @MessagePattern({ cmd: 'validateProducts' })
  validateProduct(
    @Payload() ids: number[]
  ) {
    return this.productsService.validateProducts(ids);
  }


}