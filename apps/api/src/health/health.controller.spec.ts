import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { DataSource } from 'typeorm';

describe('HealthController', () => {
  let controller: HealthController;

  const mockDataSource = {
    query: jest.fn(),
  };

  beforeEach(async () => {
    mockDataSource.query.mockReset();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return ok for liveness', () => {
    expect(controller.checkLiveness()).toEqual({
      status: 'ok',
    });
  });

  it('should return ok when database is connected', async () => {
    mockDataSource.query.mockResolvedValue([{ '?column?': 1 }]);

    await expect(controller.checkReadiness()).resolves.toEqual({
      status: 'ok',
      database: 'connected',
    });

    expect(mockDataSource.query).toHaveBeenCalledWith('SELECT 1');
  });

  it('should throw 503 when database is unavailable', async () => {
    mockDataSource.query.mockRejectedValue(new Error('Database unavailable'));

    await expect(controller.checkReadiness()).rejects.toMatchObject({
      status: 503,
    });
  });
});
