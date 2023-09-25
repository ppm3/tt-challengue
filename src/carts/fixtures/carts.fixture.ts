import { Types } from "mongoose";
import { CreateCartDto } from "../dtos/create-cart.dto";
import { productFixture } from "../../products/fixtures/products.fixture";

export const userId: string = '0001';

const { _id } = productFixture[2];

const id: Types.ObjectId = new Types.ObjectId();


export const cartFixture: CreateCartDto[] = [
    {
        _id: id,
        id: id.toString(),
        user_id: userId,
        products: [
            {
                product_id: _id,
                qty: 3
            }
        ]
    }
]