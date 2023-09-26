import {
  IsString,
  IsNotEmpty,
  IsNumberString,
  IsStrongPassword,
  MinLength,
} from 'class-validator'
import type { SignInRequest } from '../interfaces'

export class SignInDto implements SignInRequest {
  @MinLength(9)
  @IsString()
  @IsNotEmpty()
  @IsNumberString()
  user_tel: string

  @IsStrongPassword()
  @IsNotEmpty()
  password: string
}
