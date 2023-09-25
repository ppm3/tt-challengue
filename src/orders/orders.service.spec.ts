import mongoose, { Model } from 'mongoose';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CartsService } from '../carts/carts.service';
import { cartFixture } from '../carts/fixtures/carts.fixture';
import { ProductsService } from '../products/products.service';
import { Order, OrderDocument, OrderSchema } from './order.schema';
import { Cart, CartDocument, CartSchema } from '../carts/cart.schema';
import { productFixture } from '../products/fixtures/products.fixture';
import { Product, ProductDocument, ProductSchema } from '../products/product.schema';
import { closeMongoConnection, rootMongooseTestModule } from '../../test/mongobd-memory-server';

describe('OrdersService', () => {
  let service: OrdersService;
  let orderModel: Model<OrderDocument>
  let cartModel: Model<CartDocument>
  let productModel: Model<ProductDocument>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: Order.name, schema: OrderSchema },
        ]),
      ],
      providers: [OrdersService],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    orderModel = module.get<Model<OrderDocument>>('OrderModel');

    const cartsModule: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: Cart.name, schema: CartSchema }
        ]),
      ],
      providers: [CartsService],
    }).compile();
    
    cartModel = cartsModule.get<Model<CartDocument>>('CartModel');

    const productModule: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: Product.name, schema: ProductSchema }
        ]),
      ],
      providers: [ProductsService]
    }).compile();

    productModel = productModule.get<Model<ProductDocument>>('ProductModel');


    await productModel.insertMany(productFixture);
    await cartModel.insertMany(cartFixture);

  });

  it('should be create a order', async() => {
    const [ cart ] = cartFixture;

    const order: Order = await service.create(cart.id, {
      totals: {
        products: 2,
        discounts: 1,
        order: 11.0,
        shipping: 2
      }
    });

    const { 
      products: tProducts, 
      discounts: tDiscounts, 
      order: tOrder, 
      shipping: tShipping } = order.totals

    expect(order).not.toBeNull();

    expect(tOrder).toEqual(11);
    expect(tProducts).toEqual(2);
    expect(tShipping).toEqual(2);
    expect(tDiscounts).toEqual(1);
  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(async () => {
    await cartModel.deleteMany({});
    await productModel.deleteMany({});
    await orderModel.deleteMany({});
  });

  afterAll(async () => {
    await closeMongoConnection();
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
});
