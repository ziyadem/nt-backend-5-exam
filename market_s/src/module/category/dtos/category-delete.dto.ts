import type { CategoryDeleteRequest } from '../interfaces'
import { IsUUID, IsNotEmpty } from 'class-validator'

export class CategoryDeleteDto implements CategoryDeleteRequest {
  @IsUUID()
  @IsNotEmpty()
  id: string
}
