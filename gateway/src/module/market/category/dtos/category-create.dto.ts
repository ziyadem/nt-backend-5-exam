import { CategoryCreateRequest } from '@clients'
import { ApiProperty } from '@nestjs/swagger'

export class CategoryCreateDto implements CategoryCreateRequest {
  @ApiProperty({
    example: 'elektronika',
  })
  title: string
}
