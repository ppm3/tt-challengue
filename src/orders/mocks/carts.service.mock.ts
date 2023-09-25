import { Cart } from "../../carts/cart.schema";
import { CartsService } from "../../carts/carts.service"
import { anyString, instance, mock, when } from "ts-mockito";
import { cartForOrderMockModel } from "../fixtures/carts.model.fixture";

export const CartsOrderServiceMock = () => {
    const mockedService = mock(CartsService);

    when(mockedService.findById(anyString())).thenResolve(cartForOrderMockModel as Cart);

    return instance(mockedService);
}