import mongoose, { Types } from 'mongoose';
import { productMockModel } from './products.model.fixture';

export const cartOrderCreatedId = new Types.ObjectId();

const quantities: number[] = [1, 4, 5, 19, 20, 3, 8, 2, 1, 9];

const tmpProductList = [];

productMockModel.forEach((product, i) => {
  const rowId = new Types.ObjectId();
  tmpProductList.push({
    _id: rowId,
    id: rowId.toString(),
    product_id: new mongoose.Types.ObjectId(product.id),
    qty: quantities[i],
  });
});

export const cartForOrderMockModel = {
  _id: cartOrderCreatedId,
  id: cartOrderCreatedId.toString(),
  user_id: '0001',
  products: tmpProductList,
};
