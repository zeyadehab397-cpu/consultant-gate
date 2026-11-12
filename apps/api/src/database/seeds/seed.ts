import { AppDataSource } from '../data-source';
import { seedSpecialties } from './seed-specialties';

async function seed() {
  await AppDataSource.initialize();

  try {
    await seedSpecialties(AppDataSource);

    console.log('Specialties seeded successfully');
  } finally {
    await AppDataSource.destroy();
  }
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exitCode = 1;
});
