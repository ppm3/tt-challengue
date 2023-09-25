import { anyString, anything, instance, mock, when } from "ts-mockito";
import { OrdersService } from "../orders.service"
import { orderCreatedModel } from "../fixtures/orders.model.fixture";
import { Order } from "../order.schema";

export const OrdersServicesMock = () => {
    const mockedService = mock(OrdersService);

    when(mockedService.create(anyString(), anything())).thenResolve(orderCreatedModel as Order);

    return instance(mockedService)
}