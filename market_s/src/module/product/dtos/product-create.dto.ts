import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator'
import { ProductCreateRequest } from '../interfaces'

export class ProductCreateDto implements ProductCreateRequest {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  title: string

  @IsNumber()
  @IsNotEmpty()
  price: number

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  status?: string

  @IsUUID()
  @IsNotEmpty()
  supcategory_id: string
}
