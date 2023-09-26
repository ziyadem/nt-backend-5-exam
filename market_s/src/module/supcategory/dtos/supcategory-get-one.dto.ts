import type { SupCategoryGetOneRequest } from '../interfaces'
import { IsUUID, IsNotEmpty } from 'class-validator'

export class SupCategoryGetOneDto implements SupCategoryGetOneRequest {
  @IsUUID()
  @IsNotEmpty()
  id: string
}
