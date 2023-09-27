import { Types } from 'mongoose';
import { productFixture } from '../../products/fixtures/products.fixture';

export const userId = '0001';

const { _id } = productFixture[2];

const id: Types.ObjectId = new Types.ObjectId();
const updateId: Types.ObjectId = new Types.ObjectId();

export const cartFixture = [
  {
    _id: id,
    id: id.toString(),
    user_id: userId,
    products: [
      {
        product_id: _id,
        qty: 3,
      },
    ],
  },
  {
    _id: updateId,
    id: updateId.toString(),
    user_id: userId,
    products: [],
  },
];
