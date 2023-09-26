import { ApiProperty } from '@nestjs/swagger'
import { RestoreRequest, RestoreResponse } from 'clients/user/interfaces'

export class RestoreDto implements RestoreRequest {
  @ApiProperty({
    example: '998997821720',
  })
  user_tel: string

  @ApiProperty({
    example: 'Ziyadem.Password.123',
  })
  password: string

  @ApiProperty({
    example: true,
  })
  restore: boolean
}

export class RestoreResponseDto implements RestoreResponse {
  @ApiProperty({
    example: 'Bearer token....',
  })
  accessToken: string

  @ApiProperty({
    example: 'token....',
  })
  refreshToken: string
}
