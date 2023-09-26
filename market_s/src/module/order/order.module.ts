import { Module } from '@nestjs/common'
import { PrismaService } from '@prisma'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'

@Module({
  providers: [OrderService, PrismaService],
  controllers: [OrderController],
})
export class OrderModule {}
