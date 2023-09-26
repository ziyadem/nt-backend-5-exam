import { Global, Module } from '@nestjs/common'
import { CategoryService } from './category'
import { SupCategoryService } from './supcategory'
import { ProductService } from './product'
import { OrderService } from './order'

@Global()
@Module({
  exports: [CategoryService, SupCategoryService, ProductService, OrderService],
  providers: [
    CategoryService,
    SupCategoryService,
    ProductService,
    OrderService,
  ],
})
export class MarketModule {}
