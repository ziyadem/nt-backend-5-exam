import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { Supcategory } from '@prisma/client'
import { SupcategoryCommand } from '@enums'
import { SupCategoryService } from './supcategory.service'
import {
  SupCategoryCreateDto,
  SupCategoryDeleteDto,
  SupCategoryGetOneDto,
  SupCategoryUpdateDto,
} from './dtos'

@Controller()
export class SupCategoryController {
  readonly #_service: SupCategoryService

  constructor(service: SupCategoryService) {
    this.#_service = service
  }

  @MessagePattern(SupcategoryCommand.SUPCATEGORY_GETALL)
  getAll(): Promise<Pick<Supcategory, 'id' | 'title'>[]> {
    return this.#_service.getAll()
  }

  @MessagePattern(SupcategoryCommand.SUPCATEGORY_GETONE)
  getOne(@Payload() payload: SupCategoryGetOneDto) {
    return this.#_service.getOne(payload)
  }

  @MessagePattern(SupcategoryCommand.SUPCATEGORY_CREATE)
  async create(@Payload() payload: SupCategoryCreateDto) {
    return await this.#_service.create(payload)
  }

  @MessagePattern(SupcategoryCommand.SUPCATEGORY_UPDATE)
  update(@Payload() payload: SupCategoryUpdateDto) {
    return this.#_service.update(payload)
  }

  @MessagePattern(SupcategoryCommand.SUPCATEGORY_DELETE)
  delete(@Payload() payload: SupCategoryDeleteDto) {
    return this.#_service.delete(payload)
  }
}
