import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import apiConfig from 'src/config/api.config';
import { AppController } from './app.controller';
import mongoDBConfig from 'src/config/mongodb.config';
import { HealthController } from './health-check.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [apiConfig, mongoDBConfig],
    })
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
