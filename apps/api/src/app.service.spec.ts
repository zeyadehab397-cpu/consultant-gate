import { beforeEach, describe, expect, it } from '@jest/globals';
import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(() => {
    appService = new AppService();
  });

  it('should return a valid health response', () => {
    const result = appService.getHealth();

    expect(result).toEqual({
      status: 'ok',
      service: 'consultant-gate-api',
      timestamp: expect.any(String),
    });
  });
});
