import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './order.schema';
import { Cart, CartSchema } from 'src/carts/cart.schema';
import { Product, ProductSchema } from 'src/products/product.schema';
import { ProductsService } from 'src/products/products.service';
import { CartsService } from 'src/carts/carts.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Order.name, schema: OrderSchema },
    ]),
  ],
  providers: [OrdersService, ProductsService, CartsService],
  exports: [OrdersService],
})
export class OrdersModule {}
