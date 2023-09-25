import { Types } from "mongoose";

export class CreateProductListCartDto {
    id?: string;
    product_id?: Types.ObjectId;
    readonly qty: number; 
}


export class CreateCartDto {
    id?: string;
    _id?: Types.ObjectId;
    readonly user_id: string;
    readonly products: CreateProductListCartDto[];
}