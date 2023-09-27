import { Types } from 'mongoose';

export class CreateOrderDto {
  cart_id?: Types.ObjectId;
  totals: {
    order: number;
    products: number;
    shipping: number;
    discounts: number;
  };
}
