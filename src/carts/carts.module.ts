import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { Cart, CartSchema } from './cart.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema }
    ]),
  ],
  providers: [CartsService],
  exports: [CartsService],
})
export class CartsModule {}
