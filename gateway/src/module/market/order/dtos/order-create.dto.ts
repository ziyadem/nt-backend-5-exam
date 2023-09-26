import { ApiProperty } from '@nestjs/swagger'
import { OrderCreateRequest } from 'clients/market/order'

export class OrderCreateDto implements Pick<OrderCreateRequest, 'product_id'> {
  @ApiProperty({
    example: 'e6fb9ee2-6f5d-46bb-8b04-3b4a9b716419',
  })
  product_id: string
}
