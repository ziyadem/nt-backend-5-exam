import { Controller } from '@nestjs/common'
import { Category } from '@prisma/client'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { CategoryCommand } from '@enums'
import { CategoryService } from './category.service'
import {
  CategoryCreateDto,
  CategoryDeleteDto,
  CategoryGetOneDto,
  CategoryUpdateDto,
} from './dtos'

@Controller()
export class CategoryController {
  readonly #_service: CategoryService

  constructor(service: CategoryService) {
    this.#_service = service
  }

  @MessagePattern(CategoryCommand.CATEGORY_GETALL)
  getAll(): Promise<Pick<Category, 'id' | 'title'>[]> {
    return this.#_service.getAll()
  }

  @MessagePattern(CategoryCommand.CATEGORY_GETONE)
  getOne(@Payload() payload: CategoryGetOneDto) {
    return this.#_service.getOne(payload)
  }

  @MessagePattern(CategoryCommand.CATEGORY_CREATE)
  async create(@Payload() payload: CategoryCreateDto) {
    return await this.#_service.create(payload)
  }

  @MessagePattern(CategoryCommand.CATEGORY_UPDATE)
  update(@Payload() payload: CategoryUpdateDto) {
    return this.#_service.update(payload)
  }

  @MessagePattern(CategoryCommand.CATEGORY_DELETE)
  delete(@Payload() payload: CategoryDeleteDto) {
    return this.#_service.delete(payload)
  }
}
