import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { OrderCommand } from '@enums'
import { OrderService } from './order.service'
import { OrderCreateDto, OrderDeleteDto, OrderGetOneDto } from './dtos'

@Controller()
export class OrderController {
  readonly #_service: OrderService

  constructor(service: OrderService) {
    this.#_service = service
  }

  @MessagePattern(OrderCommand.ORDER_GETALL)
  getAll() {
    return this.#_service.getAll()
  }

  @MessagePattern(OrderCommand.ORDER_GETONE)
  getUser(@Payload() payload: OrderGetOneDto) {
    return this.#_service.getUser(payload)
  }

  @MessagePattern(OrderCommand.ORDER_CREATE)
  async create(@Payload() payload: OrderCreateDto) {
    return await this.#_service.create(payload)
  }

  @MessagePattern(OrderCommand.ORDER_DELETE)
  delete(@Payload() payload: OrderDeleteDto) {
    return this.#_service.delete(payload)
  }
}
