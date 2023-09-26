import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ProductCategoriesEnum } from "../enums/categories.enum";

export type ProductDocument = HydratedDocument<Product>;


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