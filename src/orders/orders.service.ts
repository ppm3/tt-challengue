import mongoose, { Model } from 'mongoose';
import { Order } from './order.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDto } from './dtos/create-order.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order.name) private readonly orderModel: Model<Order>
    ){}

    async create(cartId: string, order: CreateOrderDto): Promise<Order> {
        order.cart_id = new mongoose.Types.ObjectId(cartId);
        return await this.orderModel.create(order);
    }
}
