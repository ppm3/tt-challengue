import { Types } from 'mongoose';

export class CreateProductDto {
  id?: string;
  _id?: Types.ObjectId;
  readonly name: string;
  readonly price: number;
  readonly category: string;
}
