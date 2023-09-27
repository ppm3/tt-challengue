import { MongooseModule } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { ProductsService } from './products.service';
import { Test, TestingModule } from '@nestjs/testing';
import { productFixture } from './fixtures/products.fixture';
import { ProductCategoriesEnum } from '../enums/categories.enum';
import { Product, ProductDocument, ProductSchema } from './product.schema';
import {
  closeMongoConnection,
  rootMongooseTestModule,
} from '../../test/mongobd-memory-server';

describe('ProductsService testing', () => {
  let service: ProductsService;
  let productModel: Model<ProductDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: Product.name, schema: ProductSchema },
        ]),
      ],
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);

    productModel = module.get<Model<ProductDocument>>('ProductModel');
    await productModel.insertMany(productFixture);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be find all products', async () => {
    const { name: fName } = productFixture[0];
    const products: Product[] = await service.findAll();
    const { name } = products[0];

    expect(products).not.toBeNull();
    expect(products).toHaveLength(productFixture.length);
    expect(name).toEqual(fName);
  });

  it('should be get list of products using array id', async () => {
    const allProducts = await service.findAll();

    const ids: ObjectId[] = allProducts.reduce((prev, curr) => {
      prev.push(curr.id);
      return prev;
    }, []);

    const products = await service.findByIds(ids);

    expect(products).not.toBeNull();
    expect(products).toHaveLength(3);
  });

  it('should find one product by id', async () => {
    const { id: fId, name: fName } = productFixture[2];
    const { name } = await service.findOne(fId);

    expect(name).toEqual(fName);
  });

  it('should return products by category', async () => {
    const { name: fName, price: fPrice } = productFixture[1];
    const [{ name, category, price }]: Product[] = await service.findByCategory(
      ProductCategoriesEnum.equipment,
    );

    expect(name).toEqual(fName);
    expect(price).toEqual(fPrice);
    expect(category).toEqual(ProductCategoriesEnum.equipment);
  });

  afterEach(async () => {
    await productModel.deleteMany({});
  });

  afterAll(async () => {
    await closeMongoConnection();
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
});
