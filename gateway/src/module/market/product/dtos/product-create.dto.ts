import { ProductCreateRequest } from '@clients'
import { ApiProperty } from '@nestjs/swagger'

export class ProductCreateDto implements ProductCreateRequest {
  @ApiProperty({
    example: 'Iphone 14 Pro Max',
  })
  title: string

  @ApiProperty({
    example: 1000,
  })
  price: number

  @ApiProperty({
    example: 'description...',
  })
  description: string

  @ApiProperty({
    example: 'sale',
  })
  status?: string

  @ApiProperty({
    example: '6fb9ee2-6f5d-46bb-8b04-3b4a9b716419',
  })
  supcategory_id: string
}
