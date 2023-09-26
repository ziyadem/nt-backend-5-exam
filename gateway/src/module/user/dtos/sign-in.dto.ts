import { ApiProperty } from '@nestjs/swagger'
import type { SignInRequest, SignInResponse } from '@clients'

export class SignInDto implements SignInRequest {
  @ApiProperty({
    example: '998997821720',
  })
  user_tel: string

  @ApiProperty({
    example: 'Ziyadem.Password.123',
  })
  password: string
}

export class SignInResponseDto implements SignInResponse {
  @ApiProperty({
    example: 'Bearer token...',
  })
  accessToken: string

  @ApiProperty({
    example: 'token....',
  })
  refreshToken: string
}
