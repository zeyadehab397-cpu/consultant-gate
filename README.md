# Consultant Gate

A monorepo application containing a React frontend and a NestJS backend.

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Backend:** NestJS, TypeScript
- **Package Manager:** pnpm
- **Runtime:** Node.js 24.22.2

## Prerequisites

- Node.js 24.22.2
- pnpm 10.34.9

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

## Development

Start both applications:

```bash
pnpm dev
```

Start applications individually:

```bash
pnpm dev:web
pnpm dev:api
```

## Available Scripts

| Command         | Description                |
| --------------- | -------------------------- |
| `pnpm dev`      | Start frontend and backend |
| `pnpm build`    | Build all applications     |
| `pnpm lint`     | Run linting                |
| `pnpm test`     | Run unit tests             |
| `pnpm test:e2e` | Run backend E2E tests      |

## Application URLs

| Application  | URL                              |
| ------------ | -------------------------------- |
| Frontend     | http://localhost:5173            |
| Backend      | http://localhost:3000            |
| Health Check | http://localhost:3000/api/health |

## Health Check API

**GET** `/api/health`

Example response:

```json
{
  "status": "ok",
  "service": "consultant-gate-api",
  "timestamp": "2026-11-05T12:00:00.000Z"
}
```

This endpoint is used as a liveness check to verify that the backend process is responding.

## Project Structure

```text
consultant-gate/
├── apps/
│   ├── api/        # NestJS backend
│   └── web/        # React frontend
├── .editorconfig
├── .gitignore
├── .nvmrc
├── package.json
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

## Troubleshooting

- Ensure the required Node.js and pnpm versions are installed.
- Verify that environment variables are configured.
- Make sure ports 3000 and 5173 are available.
- Restart the development servers after changing environment variables.
