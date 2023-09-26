import { ApiProperty } from '@nestjs/swagger'
import { SignOutRequest } from 'clients/user/interfaces'

export class SignOutDto implements SignOutRequest {
  @ApiProperty({
    example: 'token....',
  })
  refreshToken: string
}
