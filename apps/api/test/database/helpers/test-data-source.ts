import 'reflect-metadata';

import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import path from 'node:path';

import { CreateSpecialtiesTable1794428234406 } from '../../../src/database/migration/1794428234406-CreateSpecialtiesTable';

dotenv.config({
  path: path.resolve(__dirname, '../../../../api/.env.test'),
  override: true,
});

if (process.env.DB_NAME !== 'consultant_gate_test') {
  throw new Error(
    'Tests can only run against consultant_gate_test',
  );
}

export function createTestDataSource() {
  return new DataSource({
    type: 'postgres',

    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),

    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    entities: [],

    migrations: [
      CreateSpecialtiesTable1794428234406,
    ],

    synchronize: false,
    migrationsRun: false,

    dropSchema: true,
    logging: false,
  });
}