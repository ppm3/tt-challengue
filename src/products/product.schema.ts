import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type ProductDocument = HydratedDocument<Product>;

export enum ProductCategories {
    coffee = 'Coffee',
    equipment = 'Equipment',
    accesories = 'Accessories',
}

@Schema()
export class Product{
    @Prop({ enum: ProductCategories })
    name: string;

    @Prop()
    price: Types.Decimal128;
}

export const ProductSchema = SchemaFactory.createForClass(Product);