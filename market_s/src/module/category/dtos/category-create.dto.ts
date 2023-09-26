import type { CategoryCreateRequest } from '../interfaces'
import { IsString, IsNotEmpty, MinLength } from 'class-validator'

export class CategoryCreateDto implements CategoryCreateRequest {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  title: string
}
