import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '@prisma'
import { Supcategory } from '@prisma/client'
import {
  SupCategoryGetOneRequest,
  SupCategoryCreateRequest,
  SupCategoryUpdateRequest,
  SupCategoryDeleteRequest,
} from './interfaces'

@Injectable()
export class SupCategoryService {
  readonly #_prisma: PrismaService

  constructor(prisma: PrismaService) {
    this.#_prisma = prisma
  }

  // supcategory getAll
  async getAll(): Promise<Pick<Supcategory, 'id' | 'title'>[]> {
    const supcategory = await this.#_prisma.supcategory.findMany({
      where: {
        deletedAt: null,
      },
      select: {
        id: true,
        title: true,
      },
    })
    return supcategory
  }

  // get supcategory related product
  async getOne(payload: SupCategoryGetOneRequest) {
    const supcategory = await this.#_prisma.supcategory.findMany({
      where: {
        id: payload.id,
        deletedAt: null,
      },
      select: {
        id: true,
        title: true,
        product: {
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
        },
      },
    })
    if (supcategory.length == 0) {
      return new NotFoundException('Supcategory not found')
    }
    return supcategory
  }

  //supcategory create
  async create(payload: SupCategoryCreateRequest) {
    const category = await this.#_checkCategory({ id: payload.category_id })
    if (category) {
      return category
    }
    const supcategory = await this.#_checkExistingSupCategory({
      title: payload.title,
    })
    if (supcategory) {
      return supcategory
    }
    await this.#_prisma.supcategory.create({
      data: {
        title: payload.title,
        category_id: payload.category_id,
      },
    })
    return null
  }

  // supcategory update
  async update(payload: SupCategoryUpdateRequest) {
    const supcategory = await this.#_checkSupCategory({ id: payload.id })
    if (supcategory) {
      return supcategory
    }
    try {
      await this.#_prisma.supcategory.updateMany({
        where: {
          id: payload.id,
        },
        data: {
          title: payload.title,
        },
      })
      return null
    } catch (error) {
      return new ConflictException('Supcategory already exists')
    }
  }

  // supcategory delete
  async delete(payload: SupCategoryDeleteRequest) {
    const supcategory = await this.#_checkSupCategory({ id: payload.id })
    const date = new Date()
    if (supcategory) {
      return supcategory
    }
    await this.#_prisma.supcategory.update({
      where: {
        id: payload.id,
      },
      data: {
        deletedAt: date,
        product: {
          updateMany: {
            where: {
              supcategory_id: payload.id,
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

  async #_checkCategory(payload: { id: string }) {
    const category = await this.#_prisma.category.findFirst({
      where: {
        id: payload.id,
        deletedAt: null,
      },
    })
    if (!category) {
      return new NotFoundException('Category not found')
    }
  }

  async #_checkExistingSupCategory(payload: { title: string }) {
    const supcategory = await this.#_prisma.supcategory.findFirst({
      where: {
        title: payload.title,
        deletedAt: null,
      },
    })
    if (supcategory) {
      return new ConflictException('Supcategory already exists')
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
      return new NotFoundException('Supcategory not found')
    }
  }
}
