import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';
import mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });

  const config = app.get(ConfigService);

  app.enableVersioning({
    type: VersioningType.URI
  });

  mongoose.set('debug', config.get('env') === 'local');

  await app.listen(config.get('port'));
}

bootstrap();
