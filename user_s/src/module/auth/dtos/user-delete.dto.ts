import { IsNotEmpty, IsUUID } from 'class-validator'
import type { UserDeleteRequest } from '../interfaces'

export class UserDeleteDto implements UserDeleteRequest {
  @IsUUID()
  @IsNotEmpty()
  user_id: string
}
