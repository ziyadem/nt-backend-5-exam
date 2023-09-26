import { IsNotEmpty, IsUUID } from 'class-validator'
import { OrderCreateRequest } from '../interfaces'

export class OrderCreateDto implements OrderCreateRequest {
  @IsUUID()
  @IsNotEmpty()
  user_id: string

  @IsUUID()
  @IsNotEmpty()
  product_id: string
}
