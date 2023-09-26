import mongoose, {  ObjectId } from "mongoose";
import { Articles } from "../carts/cart.schema";
import { OrdersService } from "./orders.service";
import { Product } from "../products/product.schema";
import { CartsService } from "../carts/carts.service";
import { ProductsService } from "../products/products.service";
import { ProductCategoriesEnum } from "../enums/categories.enum";
import { Controller, HttpException, HttpStatus, Logger, Param, Post, Version } from "@nestjs/common";


@Controller('order')
export class OrdersController {
    constructor(
        private readonly cartsService: CartsService,
        private readonly ordersService: OrdersService,
        private readonly productsService: ProductsService,
    ) { }

    @Version('1')
    @Post('/:id')
    async create(@Param('id') cartId: string) {
        try {
            const cart = await this.cartsService.findById(cartId);
            const { products: articles } = cart;
            let discounts = 0;
    
            const ids: ObjectId[] = articles.reduce((prev: any[], curr: Articles) => {
                prev.push(curr.product_id);
                return prev;
            }, [])
    
            const products = await this.productsService.findByIds(ids);
    
            const groupDiscounts = this.calculateDiscounts(products, articles);
            const shipping = this.calculateShipping(products, articles);
            let order = this.calculateOrder(products, articles);
    
    
            for (const discount of groupDiscounts) {
                discounts += discount;
            }
    
            discounts =  this.roundDecimals(discounts);
            order = this.roundDecimals(order - discounts);
    
    
            return await this.ordersService.create(cartId, {
                totals: {
                    products: articles.length,  // total products
                    discounts,                  // discounts
                    shipping,                   // total quantity of selected products (minus the quantity of equipments)
                    order,                      // total to pay
                },
            });
        } catch(error) {
            throw new HttpException(
                'Error processing your order, please try again later', 
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Calculate the total for the order
    private calculateOrder(products: Product[], articles: Articles[]): number {
        return articles.reduce((sum: number, article: Articles) => {
            const product: Product = products.find(p => p.id === article.product_id.toString());
            return sum + (product.price + article.qty);
        }, 0);
    }

    // Calculate the discounts for the order
    private calculateDiscounts(products: Product[], articles: Articles[]): number[] {
        let discounts: number[] = [];
        const coffeeProducts = products.filter(product => product.category === ProductCategoriesEnum.coffee);
        const accessoriesProducts = products.filter(product => product.category === ProductCategoriesEnum.accesories);

        // If you buy two or more products with category Coffee, then you receive one extra for free
        if (coffeeProducts.length >= 2) {
            discounts.push(coffeeProducts[0].price);
        }


        // If you spend more than 70 dollars on category Accessories then you receive 10% discounts
        const accessoriesTotal = accessoriesProducts.reduce((sum: number, product: Product) => {
            const article: Articles = articles.find((cartArtitle) => cartArtitle.product_id.toString() === product.id);
            return sum + (product.price + article.qty);
        }, 0);

        if (accessoriesTotal >= 70) {
            discounts.push(accessoriesTotal * 0.1);
        }

        return discounts;
    }

    // Calculate the shipping cost for the order
    private calculateShipping(products: Product[], articles: Articles[]): number {
        const totalOrderProducts: number = articles.reduce((sum: number, article: Articles) => sum + article.qty, 0);
        const equipmentProducts = products.filter(product => product.category === ProductCategoriesEnum.equipment);

        // If you buy more than 3 products from the Equipment category, then you get free shipping    
        if (equipmentProducts.length > 3) {
            const totalProductEquipments: number = equipmentProducts.reduce((sum: number, product: Product) => {
                const article = articles.find((p) => product.id === p.product_id.toString());
                return sum + article.qty;
            }, 0);

            return totalOrderProducts - totalProductEquipments;
        }

        return totalOrderProducts;
    }

    private roundDecimals(price: number): number {
        return Math.round(price * 100) / 100;
    }
}