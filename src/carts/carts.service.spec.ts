import mongoose, { Model } from 'mongoose';
import { CartsService } from './carts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { cartFixture, userId } from './fixtures/carts.fixture';
import { Cart, CartDocument, CartSchema } from './cart.schema';
import { ProductsService } from '../products/products.service';
import { CreateProductListCartDto } from './dtos/create-cart.dto';
import { productFixture } from '../products/fixtures/products.fixture';
import { Product, ProductDocument, ProductSchema } from '../products/product.schema';
import { closeMongoConnection, rootMongooseTestModule } from '../../test/mongobd-memory-server';
import { Logger } from '@nestjs/common';

describe('CartsService', () => {
  let service: CartsService;
  let logger = new Logger('CartsService');
  let cartModel: Model<CartDocument>;
  let productModel: Model<ProductDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: Cart.name, schema: CartSchema },
        ]),
      ],
      providers: [CartsService],
    }).compile();

    service = module.get<CartsService>(CartsService);
    cartModel = module.get<Model<CartDocument>>('CartModel');


    const productModule: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: Product.name, schema: ProductSchema }
        ]),
      ],
      providers: [ProductsService],
    }).compile();


    productModel = productModule.get<Model<ProductDocument>>('ProductModel');

    await productModel.insertMany(productFixture);
    await cartModel.insertMany(cartFixture);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be find a cart using id', async() => {
    const [ { id: cartId } ] = cartFixture;

    const cart = await service.findById(cartId);

    expect(cart).not.toBeNull();
    expect(cart.id).toEqual(cartId);
  });


  it('should be create a cart', async () => {

    const newUserId = '0002';
    const quatity: number = 3;
    const product = productFixture[2];
    
    const products: CreateProductListCartDto[] =  [
      { product_id: product._id, qty: quatity  }
    ];

    const cart: Cart = await service.create({
      user_id: newUserId,
      products: products
    });

    expect(cart).not.toBeNull();
    expect(cart.products).toHaveLength(1);

    const { user_id: nUserId, products: [ article ] } = cart;

    expect(nUserId).toEqual(newUserId);
    expect(article.qty).toEqual(quatity);
  });

  it('should be update a cart', async () => {
    const qty = 19;
    const [ { id: cartId } ] = cartFixture;
    const { id: productId } = productFixture[2];

    const updatedCart = await service.updateOne({ cartId, productId }, qty);
    const { id: updatedCartId, user_id, products: updatedCartProducts } = updatedCart;
    expect(updatedCart).not.toBeNull();

    expect(updatedCartId).toEqual(cartId);
    expect(user_id).toEqual(userId);
    
    const [ { qty: updatedCartQty } ] = updatedCartProducts;

    expect(updatedCartQty).toEqual(qty);
  });

  it('should be delete list of the products with product id', async() => {
    const [ { id: cartId } ] = cartFixture;
    const { id: productId } = productFixture[2];

    const deleteCart = await service.removeOneProduct({ cartId, productId });

    expect(deleteCart).not.toBeNull();

    const cart = await service.findById(cartId);

    expect(cart).not.toBeNull();

    const { products } = cart;
    expect(products).toHaveLength(0);

  });

  
  afterEach(async () => {
    await cartModel.deleteMany({});
    await productModel.deleteMany({});
  });

  afterAll(async () => {
    await closeMongoConnection();
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
});
