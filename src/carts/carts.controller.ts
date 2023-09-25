import { Body, Controller, HttpException, HttpStatus, Logger, Param, Post, Put, Version } from "@nestjs/common";
import { CartsService } from "./carts.service";
import { Cart } from "./cart.schema";
import { CreateArticlesDto } from "./dtos/create-articles.dto";
import { IsNotEmpty, IsNumberString } from "class-validator";
import { BodyAddProductDto } from "./dtos/body-add-product.dto";
import mongoose from "mongoose";

export class UserIdBody {
    @IsNotEmpty()
    @IsNumberString()
    userId: string;
}

@Controller('cart')
export class CartsController {
    readonly logger = new Logger(CartsController.name);

    constructor(
        private readonly cartService: CartsService
    ){}

    @Version('v1')
    @Post()
    async create(
        @Body() userIdBody: UserIdBody
    ): Promise<Cart> {
        const cart: Cart = await this.cartService.create(userIdBody.userId);

        if (!cart)
            throw new HttpException('', HttpStatus.NOT_FOUND);

        return cart;
    }

    @Version('v1')
    @Post('/:cartId/products')
    async addProductsToCart(
        @Param('cartId') cartId: string,
        @Body() articles: BodyAddProductDto[],
    ): Promise<Cart> {
        const addArticles: CreateArticlesDto[] = articles.reduce((prev, curr) => {
            prev.push({
                qty: curr.qty,
                product_id: new mongoose.Types.ObjectId(curr.product_id),
            });

            return prev;
        }, []);
        const cart =  await this.cartService.addProducts(cartId, addArticles);

        if (!cart)
            throw new HttpException('', HttpStatus.NOT_FOUND);

        return cart;
    }

    @Version('v1')
    @Put('/:cartId/products/:productId')
    async modifyProductQuantity(
        @Param('cartId') cartId: string,
        @Param('productId') productId: string,
        @Body() quantity: number,
    ): Promise<Cart> {
        let cart: Cart;

        if (quantity > 0)
            cart = await this.cartService.updateOne({
                cartId,
                productId
            }, quantity);
        else 
            cart = await this.cartService.removeOneProduct({
                cartId,
                productId
            });
        
        if (!cart)
            throw new HttpException('', HttpStatus.NOT_FOUND);
        
        return cart;
    }
}