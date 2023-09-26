import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { ProductService } from './product.service'
import { ProductCommand } from '@enums'
import { ProductCreateDto } from './dtos/product-create.dto'
import { Product } from '@prisma/client'
import { ProductDeleteDto, ProductgetOneDto } from './dtos'
import { ProductUpdateDto } from './dtos/product-update.dto'

@Controller()
export class ProductController {
  readonly #_service: ProductService

  constructor(service: ProductService) {
    this.#_service = service
  }

  @MessagePattern(ProductCommand.PRODUCT_GETALL)
  getAll(): Promise<Pick<Product, 'id' | 'title' | 'price' | 'description'>[]> {
    return this.#_service.getAll()
  }

  @MessagePattern(ProductCommand.PRODUCT_GETONE)
  getOne(
    @Payload() payload: ProductgetOneDto,
  ): Promise<
    Pick<Product, 'id' | 'title' | 'price' | 'status' | 'description'>[]
  > {
    return this.#_service.getOne(payload)
  }

  @MessagePattern(ProductCommand.PRODUCT_CREATE)
  async create(@Payload() payload: ProductCreateDto) {
    return await this.#_service.create(payload)
  }

  @MessagePattern(ProductCommand.PRODUCT_UPDATE)
  update(@Payload() payload: ProductUpdateDto) {
    return this.#_service.update(payload)
  }

  @MessagePattern(ProductCommand.PRODUCT_DELETE)
  delete(@Payload() payload: ProductDeleteDto) {
    return this.#_service.delete(payload)
  }
}
