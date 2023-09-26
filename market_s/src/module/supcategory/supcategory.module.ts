import { Module } from '@nestjs/common'
import { PrismaService } from '@prisma'
import { SupCategoryService } from './supcategory.service'
import { SupCategoryController } from './supcategory.controller'

@Module({
  providers: [SupCategoryService, PrismaService],
  controllers: [SupCategoryController],
})
export class SupCategoryModule {}
