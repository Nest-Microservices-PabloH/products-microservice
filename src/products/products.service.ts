import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { PaginationDto } from '../common';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger(ProductsService.name);

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to database');
  }

  create(createProductDto: CreateProductDto) {

    return this.product.create({
      data: createProductDto
    })

  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const totalPages = await this.product.count({
      where: {
        available: true
      }
    });

    const lastPage = Math.ceil(totalPages / limit);

    return {
      data: await this.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          available: true
        }
      }),
      meta: {
        total: totalPages,
        page: page,
        lastPage: lastPage
      }
    }
  }

  async findOne(id: number) {
    const product = await this.product.findUnique({
      where: { id, available: true }
    })

    if (!product) throw new NotFoundException(`Product with id #${id} not found`);

    return product;

  }

  async update(id: number, updateProductDto: UpdateProductDto) {

    const { id: __, ...toUpdate } = updateProductDto

    await this.findOne(id)

    return await this.product.update({
      where: { id },
      data: toUpdate
    })
  }

  async remove(id: number) {

    await this.findOne(id)

    return await this.product.update({
      where: { id },
      data: {
        available: false
      }
    })

  }
}
