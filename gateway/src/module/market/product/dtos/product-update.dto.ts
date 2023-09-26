import { ProductUpdateRequest } from '@clients'
import { ApiProperty } from '@nestjs/swagger'

export class ProductUpdateDto implements Omit<ProductUpdateRequest, 'id'> {
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
}
