import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),

        PORT: Joi.number().port().default(3000),

        WEB_ORIGIN: Joi.string()
          .uri()
          .default('http://localhost:5173'),

        DB_HOST: Joi.string().hostname().min(1).required(),

        DB_PORT: Joi.number().port().required(),

        DB_USERNAME: Joi.string().min(1).required(),

        DB_PASSWORD: Joi.string().min(1).required(),

        DB_NAME: Joi.string().min(1).required(),
      }),
    
    }),
  DatabaseModule,
  HealthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
