import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common'
import {
  ApiTags,
  ApiBody,
  ApiParam,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger'
import { VerifyAccessInterceptor } from '@interceptors'
import { OrderService } from '@clients'
import { OrderCreateDto } from './dtos'

@ApiTags('Order')
@UseInterceptors(VerifyAccessInterceptor)
@Controller({
  path: 'market-service/order',
  version: '1',
})
export class OrderController {
  readonly #_service: OrderService

  constructor(service: OrderService) {
    this.#_service = service
  }

  // getAll
  @HttpCode(HttpStatus.OK)
  @Get('/all')
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  orderGetAll() {
    return this.#_service.orderGetAll()
  }

  // getUser
  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  orderGetUser(@Body() body: any) {
    return this.#_service.orderGetUser(body)
  }

  // create
  @HttpCode(HttpStatus.OK)
  @Post()
  @ApiBody({ type: OrderCreateDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  orderCreate(@Body() body: OrderCreateDto) {
    return this.#_service.orderCreate(body)
  }

  // delete
  @HttpCode(HttpStatus.OK)
  @Delete('/:order_id')
  @ApiParam({
    name: 'order_id',
    example: 'e6fb9ee2-6f5d-46bb-8b04-3b4a9b716419',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  orderDelete(
    @Param('order_id', ParseUUIDPipe) order_id: string,
    @Body() body: any,
  ) {
    return this.#_service.orderDelete({ ...body, order_id })
  }
}
