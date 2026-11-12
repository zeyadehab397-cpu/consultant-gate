import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSpecialtiesTable1794428234406 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE specialties (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name VARCHAR(150) NOT NULL,
          slug VARCHAR(150) NOT NULL,
          description TEXT,
          is_active BOOLEAN NOT NULL DEFAULT TRUE,
         created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
         updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT uq_specialties_name UNIQUE (name),
        CONSTRAINT uq_specialties_slug UNIQUE (slug)
          )  
            
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE specialties;
    `);
  }
}
