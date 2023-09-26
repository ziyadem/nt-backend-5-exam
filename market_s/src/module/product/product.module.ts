import { Module } from '@nestjs/common'
import { PrismaService } from '@prisma'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'

@Module({
  providers: [ProductService, PrismaService],
  controllers: [ProductController],
})
export class ProductModule {}
