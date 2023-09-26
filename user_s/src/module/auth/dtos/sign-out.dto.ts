import { IsString, IsNotEmpty, MinLength } from 'class-validator'
import type { SignOutRequest } from '../interfaces'

export class SignOutDto implements SignOutRequest {
  @MinLength(20)
  @IsString()
  @IsNotEmpty()
  refreshToken: string
}
