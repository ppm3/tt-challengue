import { Product } from "../../products/product.schema";
import { anything, instance, mock, when } from "ts-mockito"
import { ProductsService } from "../../products/products.service"
import { productMockModel } from "../fixtures/products.model.fixture";

export const ProductsServiceMock = () => {
    const mockedService = mock(ProductsService);

    when(mockedService.findByIds(anything())).thenResolve(productMockModel as Product[]);

    return instance(mockedService);
}