import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  MinLength,
} from 'class-validator'
import type { SupCategoryUpdateRequest } from '../interfaces'

export class SupCategoryUpdateDto implements SupCategoryUpdateRequest {
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
