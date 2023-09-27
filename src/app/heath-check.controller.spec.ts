import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health-check.controller';
import { AppService } from './app.service';

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [AppService],
    }).compile();

    healthController = app.get<HealthController>(HealthController);
  });

  describe('health check status', () => {
    it('should be return a json with uptime value', () => {
      const resp = healthController.getgetHealthCheck();

      expect(resp).not.toBeNull();
      expect(Object.keys(resp)).toContain('uptime');
    });
  });
});
