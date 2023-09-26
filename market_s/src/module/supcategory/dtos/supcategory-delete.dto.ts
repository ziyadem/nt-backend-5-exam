import { IsUUID, IsNotEmpty } from 'class-validator'
import type { SupCategoryDeleteRequest } from '../interfaces'

export class SupCategoryDeleteDto implements SupCategoryDeleteRequest {
  @IsUUID()
  @IsNotEmpty()
  id: string
}
