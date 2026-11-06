import { Injectable } from '@nestjs/common';
import { HealthResponse } from './app.types';

@Injectable()
export class AppService {
  getHealth(): HealthResponse {
    return {
      status: 'ok',
      service: 'consultant-gate-api',
      timestamp: new Date().toISOString(),
    };
  }
}
