import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
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
import { CategoryService } from '@clients'
import { CategoryCreateDto, CategoryUpdateDto } from './dtos'

@ApiTags('Category')
@Controller({
  path: 'market-service/category',
  version: '1',
})
export class CategoryController {
  readonly #_service: CategoryService

  constructor(service: CategoryService) {
    this.#_service = service
  }

  // getAll
  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  categoryGetAll() {
    return this.#_service.categoryGetAll()
  }

  // getOne
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  @ApiParam({ name: 'id', example: 'e6fb9ee2-6f5d-46bb-8b04-3b4a9b716419' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  categoryGetOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.#_service.categoryGetOne({ id })
  }

  // create
  @HttpCode(HttpStatus.OK)
  @Post()
  @ApiBody({ type: CategoryCreateDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  categoryCreate(@Body() body: CategoryCreateDto) {
    return this.#_service.categoryCreate(body)
  }

  // update
  @HttpCode(HttpStatus.OK)
  @Patch('/:id')
  @ApiBody({ type: CategoryUpdateDto })
  @ApiParam({ name: 'id', example: 'e6fb9ee2-6f5d-46bb-8b04-3b4a9b716419' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  categoryUpdate(
    @Body() body: CategoryUpdateDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.#_service.categoryUpdate({
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
  categoryDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.#_service.categoryDelete({ id })
  }
}
