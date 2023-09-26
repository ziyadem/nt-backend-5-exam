import { Module } from '@nestjs/common'
import { MarketModule } from '@clients'
import { CategoryController } from './category'
import { SupCategoryController } from './supcategory'
import { ProductController } from './product'
import { OrderController } from './order'

@Module({
  imports: [MarketModule],
  controllers: [
    CategoryController,
    SupCategoryController,
    ProductController,
    OrderController,
  ],
})
export class MarketGatewayModule {}
