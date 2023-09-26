import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator'
import { ProductUpdateRequest } from '../interfaces'

export class ProductUpdateDto implements ProductUpdateRequest {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @IsOptional()
  title: string

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  price: number

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  status?: string

  @IsUUID()
  @IsOptional()
  @IsNotEmpty()
  id: string
}
