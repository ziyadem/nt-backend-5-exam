import type { CategoryGetOneRequest } from '../interfaces'
import { IsUUID, IsNotEmpty } from 'class-validator'

export class CategoryGetOneDto implements CategoryGetOneRequest {
  @IsUUID()
  @IsNotEmpty()
  id: string
}
