# Consultant Gate

A monorepo application containing a React frontend and a NestJS backend.

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Backend:** NestJS, TypeScript
- **Database:** PostgreSQL 17.6
- **ORM:** TypeORM
- **Package Manager:** pnpm
- **Runtime:** Node.js 24.22.2

## Prerequisites

- Node.js 24.22.2
- pnpm 10.34.9
- Docker with Docker Compose
- Git

## Installation

Clone the repository and install dependencies:

```bash
pnpm install
```

Create environment files from the examples:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

Create a root `.env` file for Docker Compose and configure the PostgreSQL variables:

```env
POSTGRES_DB=consultant_gate
POSTGRES_USER=consultant_dev
POSTGRES_PASSWORD=your_local_password
```

Configure `apps/api/.env` with the matching database credentials:

```env
DB_HOST=localhost
DB_PORT=5433
DB_USERNAME=consultant_dev
DB_PASSWORD=your_local_password
DB_NAME=consultant_gate
```

For integration tests, create `apps/api/.env.test`:

```env
NODE_ENV=test
DB_HOST=localhost
DB_PORT=5433
DB_USERNAME=consultant_dev
DB_PASSWORD=your_local_password
DB_NAME=consultant_gate_test
```

Never commit real credentials or environment files to version control.

## Development

### Start PostgreSQL

Start the Docker service if necessary, then run Docker Compose from the project root:

```bash
sudo service docker start
sudo docker compose up -d
```

Check the database container:

```bash
sudo docker compose ps
```

### Start Applications

Start both applications:

```bash
pnpm dev
```

Start applications individually:

```bash
pnpm dev:web
pnpm dev:api
```

### Stop PostgreSQL

Stop and remove the container without deleting the database volume:

```bash
sudo docker compose down
```

The PostgreSQL data is stored in a Docker volume and is preserved when the container is stopped or removed this way.

## Database Management

All database commands below should be executed from the repository root unless otherwise specified.

### Database Migrations

Run pending migrations:

```bash
pnpm --filter api migration:run
```

Show migration status:

```bash
pnpm --filter api migration:show
```

Revert the latest migration:

```bash
pnpm --filter api migration:revert
```

Generate a migration:

```bash
pnpm --filter api migration:generate -- src/database/migration/MigrationName
```

Migrations are managed explicitly through TypeORM. Automatic schema synchronization is disabled.

### Seed Development Data

Insert the development specialties:

```bash
pnpm --filter api seed
```

The seed operation is idempotent and can be executed more than once without duplicating existing specialties.

Seeding is an explicit operation and is not automatically triggered during application startup.

### Reset Development Schema

To remove the specialties table through the migration system and recreate it:

```bash
pnpm --filter api migration:revert
pnpm --filter api migration:run
pnpm --filter api seed
```

**Warning:** Reverting this migration drops the `specialties` table and deletes its data. Only perform this operation when the data can safely be discarded.

Do not use `docker compose down -v` unless you intentionally want to delete the PostgreSQL volume and all stored database data.

## Integration Testing

Integration tests use a separate database named `consultant_gate_test`.

Create the test database once if it does not exist:

```sql
CREATE DATABASE consultant_gate_test OWNER consultant_dev;
```

Run integration tests:

```bash
pnpm --filter api test:integration
```

The integration test configuration uses an isolated test database and resets its schema during test setup.

The tests cover:

- Migration execution and expected table structure.
- Column types and nullability.
- Unique constraints on specialty names and slugs.
- Required fields.
- Seed data insertion.
- Seed idempotency.

Never point integration tests at the development or production database.

## Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start frontend and backend |
| `pnpm dev:web` | Start frontend |
| `pnpm dev:api` | Start backend |
| `pnpm build` | Build all applications |
| `pnpm lint` | Run linting |
| `pnpm test` | Run unit tests |
| `pnpm test:e2e` | Run backend E2E tests |
| `pnpm --filter api test:integration` | Run database integration tests |
| `pnpm --filter api migration:run` | Execute pending migrations |
| `pnpm --filter api migration:revert` | Revert the latest migration |
| `pnpm --filter api migration:show` | Display migration status |
| `pnpm --filter api seed` | Insert development seed data |

## Application URLs

| Application | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:3000 |
| API Health Check | http://localhost:3000/api/health |
| Liveness | http://localhost:3000/health/live |
| Readiness | http://localhost:3000/health/ready |

## Health Check API

### Liveness

**GET** `/health/live`

Checks whether the backend process is running and responding.

Example response:

```json
{
  "status": "ok"
}
```

Liveness does not depend on database availability.

### Readiness

**GET** `/health/ready`

Checks whether the backend can communicate with PostgreSQL by executing a simple database query.

Successful response:

```json
{
  "status": "ok",
  "database": "connected"
}
```

If the database is unavailable, the endpoint returns HTTP `503 Service Unavailable`.

Internal database credentials and error details are not exposed in the response.

## Project Structure

consultant-gate/
├── apps/
│   ├── api/
│   │   ├── src/
│   │   │   └── database/
│   │   │       ├── migration/
│   │   │       └── seeds/
│   │   ├── test/
│   │   │   └── database/
│   │   │       ├── helpers/
│   │   │       ├── migrations.integration-spec.ts
│   │   │       ├── constraints.integration-spec.ts
│   │   │       └── seed.integration-spec.ts
│   │   └── .env.example
│   └── web/
├── docs/
├── compose.yaml
├── .env.example
├── .editorconfig
├── .gitignore
├── .nvmrc
├── package.json
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
## Troubleshooting

### PostgreSQL container is not running

Start Docker and PostgreSQL:

```bash
sudo service docker start
sudo docker compose up -d
```

### Database connection refused

- Verify that the PostgreSQL container is running.
- Check that the host port `5433` is available.
- Verify `DB_HOST`, `DB_PORT`, and database credentials in `apps/api/.env`.
- Ensure the API database configuration matches the Docker Compose configuration.

### Password authentication failed

Verify that `DB_USERNAME` and `DB_PASSWORD` match the credentials used when the PostgreSQL database was initialized.

Changing the Compose password does not automatically change the password of an already initialized PostgreSQL volume.

### Migration errors

Check the migration status:

```bash
pnpm --filter api migration:show
```

Verify that the database is available and that the API environment variables are correct.

### Integration test configuration errors

- Verify that `apps/api/.env.test` exists.
- Confirm that `DB_NAME` is set to `consultant_gate_test`.
- Ensure the test database exists and is accessible.
- Never use the development database for integration tests.

### Port conflicts

Make sure ports `3000`, `5173`, and `5433` are available.

Restart the development servers after changing environment variables.