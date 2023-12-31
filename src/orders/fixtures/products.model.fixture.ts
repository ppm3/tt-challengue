import { Types } from 'mongoose';
import { ProductCategoriesEnum } from '../../enums/categories.enum';

const tmpProductsModel = [];

const categories = [
  {
    category: ProductCategoriesEnum.accesories,
    name: 'Coffee mug',
  },
  {
    category: ProductCategoriesEnum.accesories,
    name: 'Coffee tamper',
  },
  {
    category: ProductCategoriesEnum.accesories,
    name: 'Coffee scale',
  },
  {
    category: ProductCategoriesEnum.coffee,
    name: 'Latte',
  },
  {
    category: ProductCategoriesEnum.coffee,
    name: 'Espresso',
  },
  {
    category: ProductCategoriesEnum.coffee,
    name: 'Americano',
  },
  {
    category: ProductCategoriesEnum.coffee,
    name: 'Cold brew',
  },
  {
    category: ProductCategoriesEnum.equipment,
    name: 'Espresso machine',
  },
  {
    category: ProductCategoriesEnum.equipment,
    name: 'Coffee grinder',
  },
  {
    category: ProductCategoriesEnum.equipment,
    name: 'Coffee maker',
  },
];

const prices = [21.1, 9.28, 12.92, 5.19, 43.25, 59, 78, 47.1, 89.1, 94.05];

for (let i = 0; i < 10; i++) {
  const id = new Types.ObjectId();

  tmpProductsModel.push({
    _id: id,
    name: categories[i].name,
    id: id.toString(),
    category: categories[i].category,
    price: prices[i],
  });
}

export const productMockModel = tmpProductsModel;
