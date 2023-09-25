import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types } from "mongoose";
import { Cart } from "../carts/cart.schema";

export type OrderDocument = HydratedDocument<Order>

@Schema()
export class orderTotals {
    @Prop()
    products: number;

    @Prop()
    discounts: number;

    @Prop()
    shipping: number;

    @Prop()
    order: Number;
}


@Schema()
export class Order {
    @Prop({ type: SchemaTypes.ObjectId, ref: Cart.name })
    cart_id: Types.ObjectId;

    @Prop()
    totals: orderTotals;

}

export const OrderSchema = SchemaFactory.createForClass(Order);