import { Test, TestingModule } from "@nestjs/testing";
import { CartsController } from "./carts.controller";
import { CartsService } from "./carts.service";
import { CartsServiceMock } from "./mocks/carts.service.mock";
import { createCartId, productCartId } from "./fixtures/carts.model.fixture";
import { HttpStatus } from "@nestjs/common";
import { BodyAddProductDto } from "./dtos/body-add-product.dto";

describe('CartsController', () => {
    let cartsController: CartsController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [CartsController],
            providers: [
                {
                    provide: CartsService,
                    useFactory: CartsServiceMock,
                }
            ]
        }).compile();

        cartsController = app.get<CartsController>(CartsController);
    });

    describe('cart create with endpoint', () => {
        it('should be create cart successfully', async () => {
            const cart = await cartsController.create({ userId: '001' });

            expect(cart).not.toBeNull();
            
            const { user_id: userId, products } = cart;

            expect(userId).toEqual('001');
            expect(products).toHaveLength(0);
        });

        it('should be create cart error', async () => {
            try {
                 await cartsController.create({
                    userId: ""
                });
            } catch(error: any) {
                expect(error.status).toBe(HttpStatus.NOT_FOUND);
            }
        });

        it('should be add products in the cart successfully', async() => {
            const articles: BodyAddProductDto[] = [{
                product_id: productCartId.toString(),
                qty: 5
            }]

            const cart = await cartsController.addProductsToCart(
                createCartId.toString(),
                articles
            );

            expect(cart).not.toBeNull();
            const { products } = cart;
            
            expect(products).toHaveLength(1);
        });

        it('should be modify the quantity great than zero of cart successfully', async() => {
            const cart = await cartsController.modifyProductQuantity(
                createCartId.toString(),
                productCartId.toString(),
                1);
            
                expect(cart).not.toBeNull();
                const { products } = cart;
                const [ article ] = products;
                const { qty } = article;

                expect(qty).toEqual(1);
        });

        it('should be modify the quantity great than zero of cart successfully', async() => {
            const cart = await cartsController.modifyProductQuantity(
                createCartId.toString(),
                productCartId.toString(),
                0);
            
                expect(cart).not.toBeNull();
                const { products } = cart;

                expect(products).toHaveLength(0);
        });
    });
});