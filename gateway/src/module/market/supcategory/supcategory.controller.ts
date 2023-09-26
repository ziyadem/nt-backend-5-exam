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
import { SupCategoryService } from '@clients'
import { SupCategoryCreateDto, SupCategoryUpdateDto } from './dtos'

@ApiTags('SupCategory')
@Controller({
  path: 'market-service/supcategory',
  version: '1',
})
export class SupCategoryController {
  readonly #_service: SupCategoryService

  constructor(service: SupCategoryService) {
    this.#_service = service
  }

  // getAll
  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  supcategoryGetAll() {
    return this.#_service.supcategoryGetAll()
  }

  // getOne
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  @ApiParam({ name: 'id', example: 'e6fb9ee2-6f5d-46bb-8b04-3b4a9b716419' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  supcategoryGetOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.#_service.supcategoryGetOne({ id })
  }

  // create
  @HttpCode(HttpStatus.OK)
  @Post()
  @ApiBody({ type: SupCategoryCreateDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  supcategoryCreate(@Body() body: SupCategoryCreateDto) {
    return this.#_service.supcategoryCreate(body)
  }

  // update
  @HttpCode(HttpStatus.OK)
  @Patch('/:id')
  @ApiBody({ type: SupCategoryUpdateDto })
  @ApiParam({ name: 'id', example: 'e6fb9ee2-6f5d-46bb-8b04-3b4a9b716419' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  supcategoryUpdate(
    @Body() body: SupCategoryUpdateDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.#_service.supcategoryUpdate({
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
  supcategoryDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.#_service.supcategoryDelete({ id })
  }
}
