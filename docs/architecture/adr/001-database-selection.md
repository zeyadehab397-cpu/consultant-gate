# ADR-001: Database Selection

- **Status:** Accepted
- **Date:** 2026-11-12
- **Decision:** PostgreSQL

## Context

Consultant Gate requires a database to store structured application data, starting with medical specialties.

The system needs reliable data integrity, unique constraints, predictable schema management, and support for future relationships between application entities.

## Decision

PostgreSQL was selected as the primary relational database.

TypeORM is used as the Object-Relational Mapper (ORM), while database schema changes are managed explicitly through migrations.

Automatic schema synchronization is disabled to prevent unintended schema modifications.

## Why PostgreSQL?

1. **Relational Data:** Supports structured entities and relationships through foreign keys.
2. **Data Integrity:** Provides primary keys, unique constraints, NOT NULL constraints, and transactions.
3. **Schema Management:** Supports explicit, version-controlled migrations.
4. **Data Types:** Provides suitable types such as UUID, BOOLEAN, TEXT, and TIMESTAMPTZ.
5. **Reliability:** Provides transactional guarantees and mature database management capabilities.
6. **Extensibility:** Supports future application requirements without changing the database technology.

## Why Not MongoDB?

MongoDB is a document-oriented NoSQL database designed around flexible document structures.

Although it is a valid database technology, PostgreSQL is a better fit for the current requirements because:

- The initial data model is structured and relational.
- Unique constraints are important for specialty names and slugs.
- Future entities may require relationships and transactional consistency.
- Explicit relational schema management is preferred for this project.

This does not mean MongoDB is unsuitable in general. It simply offers no clear advantage for the current database requirements.

## Consequences

### Positive

- Strong relational integrity.
- Explicit and predictable schema changes.
- Reliable constraint enforcement.
- Clear foundation for future entities and relationships.

### Trade-offs

- Schema changes require migrations.
- Database structure must be maintained explicitly.
- Developers need to understand relational modeling and SQL.

## Implementation

- Database: PostgreSQL 17.6
- ORM: TypeORM
- Database connection: NestJS TypeORM integration
- Migrations: TypeORM migrations
- Development database: Docker Compose
- Integration testing: Isolated PostgreSQL test database

## References

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [TypeORM Documentation](https://typeorm.io/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)