import { Types } from "mongoose";
import { cartOrderCreatedId } from "./carts.model.fixture";

export const orderId = new Types.ObjectId();

export const orderCreatedModel = {
    _id: orderId,
    id: orderId.toString(),
    cart_id: cartOrderCreatedId,
    totals: {
        shipping: 72,
        order: 525.8,
        discounts: 5.3,
        products: 10,
    }
}