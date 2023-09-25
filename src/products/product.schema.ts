import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<Product>;

export enum ProductCategoriesEnum {
    coffee = 'Coffee',
    equipment = 'Equipment',
    accesories = 'Accessories',
}

@Schema()
export class Product{
    id: string;

    @Prop({ required: true })
    name: string;
    
    @Prop({ enum: ProductCategoriesEnum, required: true })
    category: string;

    @Prop({ required: true })
    price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);