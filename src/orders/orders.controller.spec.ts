import { OrdersService } from './orders.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CartsService } from '../carts/carts.service';
import { OrdersController } from './orders.controller';
import { ProductsService } from '../products/products.service';
import { OrdersServicesMock } from './mocks/orders.services.mock';
import { CartsOrderServiceMock } from './mocks/carts.service.mock';
import { ProductsServiceMock } from './mocks/products.services.mock';
import { cartOrderCreatedId } from './fixtures/carts.model.fixture';

describe('OrdersController', () => {
  let ordersController: OrdersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: CartsService,
          useFactory: CartsOrderServiceMock,
        },
        {
          provide: ProductsService,
          useFactory: ProductsServiceMock,
        },
        {
          provide: OrdersService,
          useFactory: OrdersServicesMock,
        },
      ],
    }).compile();

    ordersController = app.get<OrdersController>(OrdersController);
  });

  describe('create orders', () => {
    it('create order succcessfully', async () => {
      const order = await ordersController.create(
        cartOrderCreatedId.toString(),
      );
      expect(order).not.toBeNull();
      const { totals } = order;
      const { shipping, order: tOrder, discounts, products } = totals;

      expect(shipping).not.toEqual(0);
      expect(tOrder).not.toEqual(0);
      expect(discounts).not.toEqual(0);
      expect(products).not.toEqual(0);
    });
  });
});
