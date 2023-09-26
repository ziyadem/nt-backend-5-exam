import { IsNotEmpty, IsUUID } from 'class-validator'
import { ProductGetOneRequest } from '../interfaces'

export class ProductgetOneDto implements ProductGetOneRequest {
  @IsUUID()
  @IsNotEmpty()
  id: string
}
