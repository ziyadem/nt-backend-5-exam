import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  MinLength,
} from 'class-validator'
import type { CategoryCreateRequest } from '../interfaces'

export class CategoryUpdateDto implements CategoryCreateRequest {
  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  id: string

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @IsOptional()
  title: string
}
