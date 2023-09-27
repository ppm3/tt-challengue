import { Order } from '../order.schema';
import { OrdersService } from '../orders.service';
import { orderCreatedModel } from '../fixtures/orders.model.fixture';
import { anyString, anything, instance, mock, when } from 'ts-mockito';

export const OrdersServicesMock = () => {
  const mockedService = mock(OrdersService);

  when(mockedService.create(anyString(), anything())).thenResolve(
    orderCreatedModel as Order,
  );

  return instance(mockedService);
};
