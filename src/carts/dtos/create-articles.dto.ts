import { Types } from 'mongoose';

export class CreateArticlesDto {
  id?: string;
  product_id: Types.ObjectId;
  readonly qty: number;
}
