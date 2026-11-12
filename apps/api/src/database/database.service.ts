import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';

import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);

  private retryInterval: ReturnType<typeof setInterval> | undefined;
  private isConnecting = false;

  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit() {
    await this.connect();

    this.retryInterval = setInterval(() => {
      void this.checkConnection();
    }, 5000);
  }

  async checkConnection() {
    if (this.isConnecting) return;

    this.isConnecting = true;

    try {
      if (!this.dataSource.isInitialized) {
        try {
          await this.dataSource.initialize();

          this.logger.log('Database connected successfully');
        } catch {
          this.logger.warn('Database unavailable. Retrying in 5 seconds...');
        }

        return;
      }

      try {
        await this.dataSource.query('SELECT 1');
      } catch {
        this.logger.warn('Database connection lost. Recovering...');

        try {
          await this.dataSource.destroy();
        } catch {
          // Ignore destroy errors and attempt to initialize again.
        }

        try {
          await this.dataSource.initialize();

          this.logger.log('Database reconnected successfully');
        } catch {
          this.logger.warn('Database reconnection failed. Will retry...');
        }
      }
    } finally {
      this.isConnecting = false;
    }
  }

  async connect() {
    if (this.dataSource.isInitialized || this.isConnecting) return;

    this.isConnecting = true;

    try {
      await this.dataSource.initialize();
      this.logger.log('Database connected successfully');
    } catch {
      this.logger.warn('Database unavailable. Retrying in 5 seconds...');
    } finally {
      this.isConnecting = false;
    }
  }

  async onModuleDestroy() {
    if (this.retryInterval) {
      clearInterval(this.retryInterval);
    }

    if (this.dataSource.isInitialized) {
      await this.dataSource.destroy();
    }
  }
}
