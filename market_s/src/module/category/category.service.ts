import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '@prisma'
import { Category } from '@prisma/client'
import {
  CategoryCreateRequest,
  CategoryDeleteRequest,
  CategoryGetOneRequest,
  CategoryUpdateRequest,
} from './interfaces'

@Injectable()
export class CategoryService {
  readonly #_prisma: PrismaService

  constructor(prisma: PrismaService) {
    this.#_prisma = prisma
  }

  // category getAll
  async getAll(): Promise<Pick<Category, 'id' | 'title'>[]> {
    const category = await this.#_prisma.category.findMany({
      where: {
        deletedAt: null,
      },
      select: {
        id: true,
        title: true,
      },
    })
    return category
  }

  // get category related supcategory
  async getOne(payload: CategoryGetOneRequest) {
    const category = await this.#_prisma.category.findMany({
      where: {
        id: payload.id,
        deletedAt: null,
      },
      select: {
        id: true,
        title: true,
        subcategory: {
          where: {
            deletedAt: null,
          },
          select: {
            id: true,
            title: true,
          },
        },
      },
    })
    if (category.length == 0) {
      return new NotFoundException('Category not found')
    }
    return category
  }

  // category create
  async create(payload: CategoryCreateRequest) {
    const category = await this.#_checkExistingCategory({
      title: payload.title,
    })
    if (category) {
      return category
    }
    await this.#_prisma.category.create({
      data: {
        title: payload.title,
      },
    })
    return null
  }

  // category update
  async update(payload: CategoryUpdateRequest) {
    const category = await this.#_checkCategory({ id: payload.id })
    if (category) {
      return category
    }
    await this.#_prisma.category.updateMany({
      where: {
        id: payload.id,
      },
      data: {
        title: payload.title,
      },
    })
    return null
  }

  // category delete
  async delete(payload: CategoryDeleteRequest) {
    const category = await this.#_checkCategory({ id: payload.id })
    const date = new Date()
    if (category) {
      return category
    }
    await this.#_prisma.category.update({
      where: {
        id: payload.id,
      },
      data: {
        deletedAt: date,
        subcategory: {
          updateMany: {
            where: {
              category_id: payload.id,
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

  async #_checkExistingCategory(payload: { title: string }) {
    const category = await this.#_prisma.category.findFirst({
      where: {
        title: payload.title,
        deletedAt: null,
      },
    })
    if (category) {
      return new ConflictException('Category already exists')
    }
  }

  async #_checkCategory(payload: { id: string }) {
    const category = await this.#_prisma.category.findFirst({
      where: {
        id: payload.id,
        deletedAt: null,
      },
      select: {
        id: true,
      },
    })
    if (!category) {
      return new NotFoundException('Category not found')
    }
  }
}
