import {
  IsString,
  MinLength,
  IsNotEmpty,
  IsStrongPassword,
  IsNumberString,
} from 'class-validator'
import type { SignUpRequest } from '../interfaces'

export class SignUpDto implements SignUpRequest {
  @MinLength(9)
  @IsString()
  @IsNotEmpty()
  @IsNumberString()
  user_tel: string

  @IsStrongPassword()
  @IsNotEmpty()
  password: string
}
