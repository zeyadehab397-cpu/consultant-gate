import { DataSource } from 'typeorm';

export const specialties = [
  {
    name: 'Cardiology',
    slug: 'cardiology',
    description: 'Heart and cardiovascular diseases',
  },
  {
    name: 'Dermatology',
    slug: 'dermatology',
    description: 'Skin, hair, and nail conditions',
  },
  {
    name: 'Neurology',
    slug: 'neurology',
    description: 'Brain and nervous system disorders',
  },
  {
    name: 'Pediatrics',
    slug: 'pediatrics',
    description: 'Medical care for infants and children',
  },
  {
    name: 'Orthopedics',
    slug: 'orthopedics',
    description: 'Bones, joints, and musculoskeletal conditions',
  },
];

export async function seedSpecialties(dataSource: DataSource) {
  for (const specialty of specialties) {
    await dataSource.query(
      `
        INSERT INTO specialties (
          name,
          slug,
          description
        )
        VALUES ($1, $2, $3)
        ON CONFLICT DO NOTHING
      `,
      [specialty.name, specialty.slug, specialty.description],
    );
  }
}
