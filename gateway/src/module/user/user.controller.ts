import {
  Controller,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  Post,
  Delete,
  Body,
  Patch,
} from '@nestjs/common'
import { UserService } from '@clients'
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger'
import {
  SignInDto,
  SignUpDto,
  SignInResponseDto,
  SignUpResponseDto,
  SignOutDto,
} from './dtos'
import { VerifyAccessInterceptor } from '@interceptors'
import { RestoreDto, RestoreResponseDto } from './dtos/restore.dto'

@ApiTags('Auth')
@Controller({
  path: 'user-service',
  version: '1',
})
export class UserController {
  readonly #_service: UserService

  constructor(service: UserService) {
    this.#_service = service
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  @ApiBody({ type: SignUpDto })
  @ApiCreatedResponse({ type: SignUpResponseDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  signUp(@Body() body: SignUpDto) {
    return this.#_service.signUp(body)
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  @ApiBody({ type: SignInDto })
  @ApiOkResponse({ type: SignInResponseDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  signIn(@Body() body: SignInDto) {
    return this.#_service.signIn(body)
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-out')
  @ApiBody({ type: SignOutDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  signOut(@Body() body: SignOutDto) {
    return this.#_service.signOut(body)
  }

  @HttpCode(HttpStatus.OK)
  @Delete()
  @UseInterceptors(VerifyAccessInterceptor)
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  userDelete(@Body() body: any) {
    return this.#_service.userDelete(body)
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/restore')
  @ApiBody({ type: RestoreDto })
  @ApiOkResponse({ type: RestoreResponseDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  restore(@Body() body: RestoreDto) {
    return this.#_service.restore(body)
  }
}
