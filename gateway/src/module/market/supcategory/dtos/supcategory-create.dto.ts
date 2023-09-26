import { SupCategoryCreateRequest } from '@clients'
import { ApiProperty } from '@nestjs/swagger'

export class SupCategoryCreateDto implements SupCategoryCreateRequest {
  @ApiProperty({
    example: 'phone',
  })
  title: string

  @ApiProperty({
    example: 'e6fb9ee2-6f5d-46bb-8b04-3b4a9b716419',
  })
  category_id: string
}
