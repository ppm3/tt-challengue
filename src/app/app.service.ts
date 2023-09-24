import { Injectable } from '@nestjs/common';
import { JSONObject } from 'src/interfaces/json-interface';

@Injectable()
export class AppService {
  getHealthCheck() :JSONObject {
    return {
      uptime: process.uptime(),
    };
  }
}
