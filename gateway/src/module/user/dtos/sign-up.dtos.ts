import { ApiProperty } from '@nestjs/swagger'
import type { SignUpRequest, SignUpResponse } from '@clients'

export class SignUpDto implements SignUpRequest {
  @ApiProperty({
    example: '998997821720',
  })
  user_tel: string

  @ApiProperty({
    example: 'Ziyadem.Password.123',
  })
  password: string
}

export class SignUpResponseDto implements SignUpResponse {
  @ApiProperty({
    example: 'Bearer token....',
  })
  accessToken: string

  @ApiProperty({
    example: 'token....',
  })
  refreshToken: string
}
