import { Cart } from '../cart.schema';
import { CartsService } from "../carts.service";
import { anyNumber, anyString, anything, instance, mock, when } from 'ts-mockito';
import { addProductsToCart, createCartsFixture, deleteProductToCart, productCartId, updateProductToCart } from '../fixtures/carts.model.fixture';


export const CartsServiceMock = () => {
    const mockedService = mock(CartsService);
    
    when(mockedService.create(anyString())).thenResolve( createCartsFixture as Cart,);
    when(mockedService.addProducts(anyString(), anything())).thenResolve( addProductsToCart as Cart );
    when(mockedService.updateOne(anything(), anyNumber())).thenResolve( updateProductToCart as Cart );
    when(mockedService.removeOneProduct(anything())).thenResolve( deleteProductToCart as Cart );

    return instance(mockedService);
}