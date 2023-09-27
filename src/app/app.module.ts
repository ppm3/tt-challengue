import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import apiConfig from '../config/api.config';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CartsModule } from '../carts/carts.module';
import mongoDBConfig from '../config/mongodb.config';
import { OrdersModule } from '../orders/orders.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthController } from './health-check.controller';
import { ProductsModule } from '../products/products.module';
import { CartsController } from 'src/carts/carts.controller';
import { OrdersController } from 'src/orders/orders.controller';

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
    CartsModule,
    OrdersModule,
    ProductsModule,
  ],
  controllers: [
    AppController,
    HealthController,
    CartsController,
    OrdersController,
  ],
  providers: [AppService],
})
export class AppModule {}
