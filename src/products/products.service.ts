import { Product } from './product.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async findByIds(ids: ObjectId[]): Promise<Product[]> {
    return await this.productModel.find({ _id: { $in: ids } });
  }

  async findAll(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    return await this.productModel.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
  }

  async findByCategory(category: string): Promise<Product[]> {
    return await this.productModel.find({ category }).exec();
  }
}
