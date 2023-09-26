import {
  IsString,
  MinLength,
  IsNotEmpty,
  IsStrongPassword,
  IsNumberString,
  IsBoolean,
} from 'class-validator'
import type { RestoreRequest } from '../interfaces'

export class RestoreDto implements RestoreRequest {
  @MinLength(9)
  @IsString()
  @IsNotEmpty()
  @IsNumberString()
  user_tel: string

  @IsStrongPassword()
  @IsNotEmpty()
  password: string

  @IsBoolean()
  @IsNotEmpty()
  restore: boolean
}
