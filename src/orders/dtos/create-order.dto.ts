import { Types } from "mongoose";

export class CreateOrderDto {
    readonly cart_id: Types.ObjectId;
    totals: {
        order: number,
        products: number,
        shipping: number,
        discounts: number,
    }   
}