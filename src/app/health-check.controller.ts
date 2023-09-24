import { AppService } from './app.service';
import { Controller, Get, Header } from '@nestjs/common';
import { JSONObject } from 'src/interfaces/json-interface';

@Controller('healthcheck')
export class HealthController {
    constructor(private readonly appService: AppService) {}

  @Get()
  getgetHealthCheck(): JSONObject {
    return this.appService.getHealthCheck();
  }
}
