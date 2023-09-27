import { Types } from 'mongoose';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ProductCategoriesEnum } from '../../enums/categories.enum';

const id: Types.ObjectId = new Types.ObjectId();

export const productFixture: CreateProductDto[] = [
  {
    name: 'Package of cups',
    category: ProductCategoriesEnum.coffee,
    price: 10.23,
  },
  {
    name: 'Vacuun machine',
    category: ProductCategoriesEnum.equipment,
    price: 20.25,
  },
  {
    _id: id,
    id: id.toString(),
    name: 'Gloves',
    category: ProductCategoriesEnum.accesories,
    price: 30.9,
  },
];
