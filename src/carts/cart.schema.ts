import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types } from "mongoose";
import { Product } from "src/products/product.schema";

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart{
    @Prop()
    user_id: string;

    @Prop({ type: SchemaTypes.ObjectId, ref: Product.name })
    products: Types.ObjectId[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);