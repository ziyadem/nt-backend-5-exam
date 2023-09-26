import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { dbConfig } from '@config'
import {
  CategoryModule,
  OrderModule,
  ProductModule,
  SupCategoryModule,
} from '@module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbConfig],
      isGlobal: true,
    }),
    CategoryModule,
    SupCategoryModule,
    ProductModule,
    OrderModule,
  ],
})
export class App {}
