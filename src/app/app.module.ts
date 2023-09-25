import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import apiConfig from 'src/config/api.config';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CartsModule } from 'src/carts/carts.module';
import mongoDBConfig from 'src/config/mongodb.config';
import { CartsService } from 'src/carts/carts.service';
import { OrdersModule } from 'src/orders/orders.module';
import { OrdersService } from 'src/orders/orders.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthController } from './health-check.controller';
import { ProductsModule } from 'src/products/products.module';
import { ProductsService } from 'src/products/products.service';

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
  controllers: [AppController, HealthController],
  providers: [AppService, ProductsService, CartsService, OrdersService],
})
export class AppModule {}
