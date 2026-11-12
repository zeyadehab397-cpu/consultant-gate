import { DataSource } from 'typeorm';

export async function cleanupSpecialties(
  dataSource: DataSource,
) {
  await dataSource.query(`
    TRUNCATE TABLE specialties;
  `);
}