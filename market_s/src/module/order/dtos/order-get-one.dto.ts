import { IsNotEmpty, IsUUID } from 'class-validator'
import { OrderGetOneRequest } from '../interfaces'

export class OrderGetOneDto implements OrderGetOneRequest {
  @IsUUID()
  @IsNotEmpty()
  user_id: string
}
