import { DataSource } from 'typeorm';

import { createTestDataSource } from '../database/helpers/test-data-source';
import { cleanupSpecialties } from '../database/helpers/cleanup';

describe('Specialties Constraints Integration Tests', () => {
  let dataSource: DataSource;

  beforeAll(async () => {
    dataSource = createTestDataSource();

    await dataSource.initialize();
    await dataSource.runMigrations();
  });

  beforeEach(async () => {
    await cleanupSpecialties(dataSource);
  });

  afterAll(async () => {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  });

  it('should insert a specialty successfully', async () => {
    await expect(
      dataSource.query(
        `
          INSERT INTO specialties (name, slug)
          VALUES ($1, $2);
        `,
        ['Cardiology', 'cardiology'],
      ),
    ).resolves.toBeDefined();
  });

  it('should reject duplicate specialty names', async () => {
    await dataSource.query(
      `
        INSERT INTO specialties (name, slug)
        VALUES ($1, $2);
      `,
      ['Cardiology', 'cardiology'],
    );

    await expect(
      dataSource.query(
        `
          INSERT INTO specialties (name, slug)
          VALUES ($1, $2);
        `,
        ['Cardiology', 'heart-care'],
      ),
    ).rejects.toHaveProperty('code', '23505');
  });

  it('should reject duplicate specialty slugs', async () => {
    await dataSource.query(
      `
        INSERT INTO specialties (name, slug)
        VALUES ($1, $2);
      `,
      ['Cardiology', 'cardiology'],
    );

    await expect(
      dataSource.query(
        `
          INSERT INTO specialties (name, slug)
          VALUES ($1, $2);
        `,
        ['Heart Care', 'cardiology'],
      ),
    ).rejects.toHaveProperty('code', '23505');
  });

  it('should reject a missing name', async () => {
    await expect(
      dataSource.query(`
        INSERT INTO specialties (slug)
        VALUES ('cardiology');
      `),
    ).rejects.toHaveProperty('code', '23502');
  });

  it('should reject a missing slug', async () => {
    await expect(
      dataSource.query(`
        INSERT INTO specialties (name)
        VALUES ('Cardiology');
      `),
    ).rejects.toHaveProperty('code', '23502');
  });
});
