import { Model } from 'mongoose';
import { Order } from './order.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDto } from './dtos/create-order.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order.name) private readonly orderModel: Model<Order>
    ){}

    async create(order: CreateOrderDto): Promise<Order> {
        return await this.orderModel.create(order);
    }
}
