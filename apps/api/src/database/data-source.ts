import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  entities: [path.join(__dirname, 'entities', '*.entity{.ts,.js}')],

  migrations: [path.join(__dirname, 'migration', '*{.ts,.js}')],

  synchronize: false,
  migrationsRun: false,
  logging: ['query', 'error'],
});