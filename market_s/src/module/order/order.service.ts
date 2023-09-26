import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '@prisma'
import {
  OrderCreateRequest,
  OrderDeleteRequest,
  OrderGetOneRequest,
} from './interfaces'

@Injectable()
export class OrderService {
  readonly #_prisma: PrismaService

  constructor(prisma: PrismaService) {
    this.#_prisma = prisma
  }

  // orde getAll
  async getAll() {
    const product = await this.#_prisma.order.findMany({
      where: {
        deletedAt: null,
      },
      select: {
        id: true,
        user_id: true,
        product: {
          select: {
            id: true,
            title: true,
            price: true,
            status: true,
            description: true,
          },
        },
      },
    })
    return product
  }

  // get order related user
  async getUser(payload: OrderGetOneRequest) {
    const order = await this.#_prisma.order.findMany({
      where: {
        user_id: payload.user_id,
        deletedAt: null,
      },
      select: {
        id: true,
        product: {
          select: {
            id: true,
            title: true,
            price: true,
            status: true,
            description: true,
          },
        },
      },
    })
    if (order.length == 0) {
      throw new NotFoundException('order not found')
    }
    const returnOrder = await this.#_getUserProduct(order)
    return returnOrder
  }

  // order create
  async create(payload: OrderCreateRequest) {
    const product = await this.#_checkProduct({
      product_id: payload.product_id,
    })
    if (product) {
      return product
    }
    try {
      await this.#_prisma.order.createMany({
        data: {
          product_id: payload.product_id,
          user_id: payload.user_id,
        },
      })
      return null
    } catch (error) {
      return new ConflictException('order already exists')
    }
  }

  // order delete
  async delete(payload: OrderDeleteRequest) {
    const order = await this.#_checkOrder({
      order_id: payload.order_id,
      user_id: payload.user_id,
    })
    const date = new Date()
    if (order) {
      return order
    }
    await this.#_prisma.order.updateMany({
      where: {
        id: payload.order_id,
        user_id: payload.user_id,
      },
      data: {
        deletedAt: date,
      },
    })
    return null
  }

  async #_checkProduct(payload: { product_id: string }) {
    const product = await this.#_prisma.product.findFirst({
      where: {
        id: payload.product_id,
        deletedAt: null,
      },
    })
    if (!product) {
      return new ConflictException('product not found')
    }
  }

  async #_getUserProduct(arr: any[]) {
    const returnOrder = []
    arr.forEach((e) => {
      e.product.order_id = e.id
      returnOrder.push(e.product)
    })
    return returnOrder
  }

  async #_checkOrder(payload: { order_id: string; user_id: string }) {
    const order = await this.#_prisma.order.findFirst({
      where: {
        id: payload.order_id,
        user_id: payload.user_id,
        deletedAt: null,
      },
      select: {
        id: true,
      },
    })
    if (!order) {
      return new NotFoundException('order not found')
    }
  }
}
