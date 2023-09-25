import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import apiConfig from '../config/api.config';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CartsModule } from '../carts/carts.module';
import mongoDBConfig from '../config/mongodb.config';
import { CartsService } from '../carts/carts.service';
import { OrdersModule } from '../orders/orders.module';
import { OrdersService } from '../orders/orders.service';
import { CartsController } from '../carts/carts.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthController } from './health-check.controller';
import { ProductsModule } from '../products/products.module';
import { ProductsService } from '../products/products.service';
import { OrdersController } from '../orders/orders.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [apiConfig, mongoDBConfig],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('mongo.uri'),
        dbName: config.get<string>('mongo.db'),
      }),
    }),
    ProductsModule,
    CartsModule,
    OrdersModule,
  ],
  controllers: [AppController, HealthController, CartsController, OrdersController],
  providers: [AppService, ProductsService, CartsService, OrdersService],
})
export class AppModule {}
