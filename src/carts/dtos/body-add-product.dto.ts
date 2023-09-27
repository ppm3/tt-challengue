import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BodyAddProductDto {
  @IsNotEmpty()
  @IsString()
  product_id: string;

  @IsNotEmpty()
  @IsNumber()
  qty: number;
}
