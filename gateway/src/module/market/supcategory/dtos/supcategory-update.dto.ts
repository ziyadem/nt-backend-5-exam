import { SupCategoryUpdateRequest } from '@clients'
import { ApiProperty } from '@nestjs/swagger'

export class SupCategoryUpdateDto
  implements Omit<SupCategoryUpdateRequest, 'id'>
{
  @ApiProperty({
    example: 'phone',
  })
  title: string
}

export class SupCategoryUpdateIdDto
  implements Pick<SupCategoryUpdateRequest, 'id'>
{
  @ApiProperty({
    name: 'id',
    example: 'e6fb9ee2-6f5d-46bb-8b04-3b4a9b716419',
  })
  id: string
}
