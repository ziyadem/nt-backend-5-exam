import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Body,
  Post,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common'
import {
  ApiTags,
  ApiBody,
  ApiParam,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger'
import { ProductService } from '@clients'
import { ProductCreateDto, ProductUpdateDto } from './dtos'

@ApiTags('Product')
@Controller({
  path: 'market-service/product',
  version: '1',
})
export class ProductController {
  readonly #_service: ProductService

  constructor(service: ProductService) {
    this.#_service = service
  }

  // getAll
  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  productGetAll() {
    return this.#_service.productGetAll()
  }

  // getOne
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  @ApiParam({ name: 'id', example: 'e6fb9ee2-6f5d-46bb-8b04-3b4a9b716419' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  productGetOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.#_service.productGetOne({ id })
  }

  // create
  @HttpCode(HttpStatus.OK)
  @Post()
  @ApiBody({ type: ProductCreateDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  productCreate(@Body() body: ProductCreateDto) {
    return this.#_service.productCreate(body)
  }

  // update
  @HttpCode(HttpStatus.OK)
  @Patch('/:id')
  @ApiBody({ type: ProductUpdateDto })
  @ApiParam({ name: 'id', example: 'e6fb9ee2-6f5d-46bb-8b04-3b4a9b716419' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  productUpdate(
    @Body() body: ProductUpdateDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.#_service.productUpdate({
      ...body,
      id,
    })
  }

  // delete
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  @ApiParam({ name: 'id', example: 'e6fb9ee2-6f5d-46bb-8b04-3b4a9b716419' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  productDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.#_service.productDelete({ id })
  }
}
