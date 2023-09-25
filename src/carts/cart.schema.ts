import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types } from "mongoose";
import { Product } from "../products/product.schema";

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Articles {
    id: string;
    
    @Prop({ type: SchemaTypes.ObjectId, ref: Product.name })
    product_id: Types.ObjectId;

    @Prop({ required: true })
    qty: number;
}

@Schema()
export class Cart{
    id: string;

    @Prop()
    user_id: string;

    @Prop()
    products: Articles[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);