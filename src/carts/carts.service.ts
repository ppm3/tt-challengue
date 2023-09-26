import { Cart } from './cart.schema';
import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateArticlesDto } from './dtos/create-articles.dto';

@Injectable()
export class CartsService {
    constructor(
        @InjectModel(Cart.name) private readonly cartModel: Model<Cart>
    ) {}

    async create(userId: string): Promise<Cart> {
        return this.cartModel.create({ 
            user_id: userId
        });
    }

    async addProducts(id: string, articles: CreateArticlesDto[]): Promise<Cart> {
        return await this.cartModel.findOneAndUpdate(
            {
                _id: new mongoose.Types.ObjectId(id)
            }, {
                products: articles
            },
            { new: true }
        );
    }

    async findById(id: string): Promise<Cart> {
        return await this.cartModel.findById({
            _id: new mongoose.Types.ObjectId(id)
        });
    }

    async updateOne(id: { cartId: string, productId: string}, qty: number): Promise<Cart> {
        return await this.cartModel.findOneAndUpdate(
            { 
                _id: new mongoose.Types.ObjectId(id.cartId),
                'products.product_id': new mongoose.Types.ObjectId(id.productId),
            },
            { $set: { 'products.$.qty': qty } },
            { new: true, returnOriginal: false }
        );
    }

    async removeOneProduct(id: { cartId: string, productId: string}): Promise<Cart> {
        return await this.cartModel.findOneAndUpdate(
            {  
                _id: new mongoose.Types.ObjectId(id.cartId),
            }, {
                $pull:  { 'products': {
                    product_id: new mongoose.Types.ObjectId(id.productId)
                } }
            }, { new: true });
    }
}
