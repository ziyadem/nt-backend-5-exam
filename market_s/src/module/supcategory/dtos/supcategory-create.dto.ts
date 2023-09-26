import type { SupCategoryCreateRequest } from '../interfaces'
import { IsString, IsNotEmpty, MinLength, IsUUID } from 'class-validator'

export class SupCategoryCreateDto implements SupCategoryCreateRequest {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  title: string

  @IsUUID()
  @MinLength(3)
  @IsNotEmpty()
  category_id: string
}
