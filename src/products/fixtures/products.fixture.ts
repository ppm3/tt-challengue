import { Types } from 'mongoose';
import { CreateProductDto } from '../dto/create-product.dto';


const id: Types.ObjectId = new Types.ObjectId();

export const productFixture: CreateProductDto[] = [
    {
      name: 'Package of cups',
      category: 'Coffee',
      price: 10.23,
    },
    {
      name: 'Vacuun machine',
      category: 'Equipment',
      price: 20.25,
    },
    {
      _id: id,
      id: id.toString(),
      name: 'Gloves',
      category: 'Accessories',
      price: 30.90,
    },
  ];