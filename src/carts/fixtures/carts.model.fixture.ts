import { Types } from 'mongoose';

export const createCartId = new Types.ObjectId();
export const nestedDocId = new Types.ObjectId();
export const productCartId = new Types.ObjectId();

export const createCartsFixture = {
  _id: createCartId,
  id: createCartId.toString(),
  user_id: '001',
  products: [],
};

export const addProductsToCart = {
  _id: createCartId,
  id: createCartId.toString(),
  user_id: '001',
  products: [
    {
      _id: nestedDocId,
      id: nestedDocId.toString(),
      product_id: productCartId,
      qty: 5,
    },
  ],
};

export const updateProductToCart = {
  _id: createCartId,
  id: createCartId.toString(),
  user_id: '001',
  products: [
    {
      _id: nestedDocId,
      id: nestedDocId.toString(),
      product_id: productCartId,
      qty: 1,
    },
  ],
};

export const deleteProductToCart = {
  _id: createCartId,
  id: createCartId.toString(),
  user_id: '001',
  products: [],
};
