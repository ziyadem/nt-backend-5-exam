import { CategoryUpdateRequest } from '@clients'
import { ApiProperty } from '@nestjs/swagger'

export class CategoryUpdateDto implements Omit<CategoryUpdateRequest, 'id'> {
  @ApiProperty({
    example: 'elektronika',
  })
  title: string
}
