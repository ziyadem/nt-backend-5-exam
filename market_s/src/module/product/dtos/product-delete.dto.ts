import { IsNotEmpty, IsUUID } from 'class-validator'
import { ProductDeleteRequest } from '../interfaces'

export class ProductDeleteDto implements ProductDeleteRequest {
  @IsUUID()
  @IsNotEmpty()
  id: string
}
