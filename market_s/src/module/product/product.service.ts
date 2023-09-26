import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '@prisma'
import { Product } from '@prisma/client'
import {
  ProductCreateRequest,
  ProductDeleteRequest,
  ProductGetOneRequest,
  ProductUpdateRequest,
} from './interfaces'

@Injectable()
export class ProductService {
  readonly #_prisma: PrismaService

  constructor(prisma: PrismaService) {
    this.#_prisma = prisma
  }

  // product get All
  async getAll(): Promise<
    Pick<Product, 'id' | 'title' | 'price' | 'status' | 'description'>[]
  > {
    const product = await this.#_prisma.product.findMany({
      where: {
        deletedAt: null,
      },
      select: {
        id: true,
        title: true,
        price: true,
        status: true,
        description: true,
      },
    })
    return product
  }

  // product get One
  async getOne(
    payload: ProductGetOneRequest,
  ): Promise<
    Pick<Product, 'id' | 'title' | 'price' | 'status' | 'description'>[]
  > {
    const product = await this.#_prisma.product.findMany({
      where: {
        id: payload.id,
        deletedAt: null,
      },
      select: {
        id: true,
        title: true,
        price: true,
        status: true,
        description: true,
      },
    })
    if (product.length == 0) {
      throw new NotFoundException('product not found')
    }
    return product
  }

  // product create
  async create(payload: ProductCreateRequest) {
    const supcategory = await this.#_checkSupCategory({
      id: payload.supcategory_id,
    })
    if (supcategory) {
      return supcategory
    }
    const product = await this.#_checkExistingProduct({ title: payload.title })
    if (product) {
      return product
    }
    await this.#_prisma.product.create({
      data: {
        title: payload.title,
        price: payload.price,
        status: payload.status,
        description: payload.description,
        supcategory_id: payload.supcategory_id,
      },
    })
    return null
  }

  // product update
  async update(payload: ProductUpdateRequest) {
    const product = await this.#_checkProduct({ id: payload.id })
    if (product) {
      return product
    }
    await this.#_prisma.product.updateMany({
      where: {
        id: payload.id,
      },
      data: {
        title: payload.title,
        price: payload.price,
        status: payload.status,
        description: payload.description,
      },
    })
    return null
  }

  // product delete
  async delete(payload: ProductDeleteRequest) {
    const product = await this.#_checkProduct({ id: payload.id })
    const date = new Date()
    if (product) {
      return product
    }
    await this.#_prisma.product.update({
      where: {
        id: payload.id,
      },
      data: {
        deletedAt: date,
        order: {
          updateMany: {
            where: {
              product_id: payload.id,
            },
            data: {
              deletedAt: date,
            },
          },
        },
      },
    })

    return null
  }

  async #_checkExistingProduct(payload: { title: string }) {
    const product = await this.#_prisma.product.findFirst({
      where: {
        title: payload.title,
        deletedAt: null,
      },
    })
    if (product) {
      return new ConflictException('Product already exists')
    }
  }

  async #_checkProduct(payload: { id: string }) {
    const product = await this.#_prisma.product.findFirst({
      where: {
        id: payload.id,
        deletedAt: null,
      },
    })
    if (!product) {
      return new ConflictException('product not found')
    }
  }

  async #_checkSupCategory(payload: { id: string }) {
    const supcategory = await this.#_prisma.supcategory.findFirst({
      where: {
        id: payload.id,
        deletedAt: null,
      },
      select: {
        id: true,
      },
    })
    if (!supcategory) {
      return new NotFoundException('SupCategory not found')
    }
  }
}
