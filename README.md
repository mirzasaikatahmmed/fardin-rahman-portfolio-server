# Fardin Rahman Portfolio Server

Backend API for Fardin Rahman's portfolio website built with NestJS, TypeORM, and PostgreSQL.

## Features

- 🔐 JWT Authentication
- 📝 Blog Management
- 💼 Project Showcase
- 👤 Profile Management
- 📧 Contact Form
- 🔗 LinkedIn Posts (admin-managed, shown on the portfolio)
- 💾 Database backup and restore (JSON, admin only)
- ♻️ Automatic frontend cache refresh after admin changes
- 🏥 Health Check Endpoint
- 🐳 Docker Support
- 🚀 CI/CD Pipeline

## Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT (Passport)
- **API Documentation**: Swagger
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions

## Prerequisites

- Node.js 20+
- pnpm 9+
- Docker & Docker Compose
- PostgreSQL 15+

## Local Development

### 1. Clone the repository

```bash
git clone <repository-url>
cd fardin-rahman-portfolio-server
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=portfolio_db
PORT=3000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h
```

### 4. Start development server

```bash
pnpm start:dev
```

The API will be available at `http://localhost:3000`

## Docker Deployment

The image is built from the `Dockerfile` in this repo (no Docker Hub image). `compose.yaml` runs only the API and connects to an external (remote) PostgreSQL configured through `DB_*`; no ports are published to the host, and the API listens on the default port `3000` inside its container.

### Local

```bash
cp .env.example .env   # fill in DB_* (remote Postgres), JWT_SECRET
docker network create dokploy-network   # once; Dokploy already has it
docker compose up -d --build
docker compose logs -f fardin_portfolio_server
```

Because no port is published, reach the API from another container on the same compose network, or temporarily run `docker compose exec fardin_portfolio_server wget -qO- http://localhost:3000/api/health`.

### Dokploy

1. Create a **Compose** service from this Git repo (Compose Type: Docker Compose, path `./compose.yaml`).
2. In **Environment**, set the variables from `.env.example` (`DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`, `JWT_SECRET`, `NODE_ENV=production`, `FRONTEND_REVALIDATE_URL`, `REVALIDATION_SECRET`, ...). Dokploy writes them to `.env` for the compose file.
3. The service joins the external `dokploy-network` (already in `compose.yaml`). That is how Traefik reaches it and how it resolves the internal host name of a Dokploy database (use the database's **Internal Host** as `DB_HOST`, port `5432`).
4. In **Domains**, add your domain for service `fardin_portfolio_server`, container port `3000`. Dokploy's Traefik routes to it; nothing is published on the host.
5. Deploy. Uploaded files live in the named volume `fardin_portfolio_uploads`; the database lives on your remote PostgreSQL.

Production runs with TypeORM `synchronize` off, so a brand new database has no tables. Restore a `pg_dump` of the old database (it includes the schema) before using the API.

## Available Scripts

- `pnpm start:dev` - Start development server with hot reload
- `pnpm build` - Build the application
- `pnpm start:prod` - Start production server
- `pnpm lint` - Run ESLint and fix issues
- `pnpm lint:check` - Check linting without fixing
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting
- `pnpm test` - Run tests

## API Documentation

Swagger documentation is available at:
- Development: `http://localhost:3000/api`
- Production: `https://your-domain.com/api`

## CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment:

### Workflow Stages

1. **Lint, Format, Build** (pushes and PRs)
   - Code linting with ESLint
   - Format checking with Prettier
   - Build verification

Deployment is done by Dokploy from the Git repo (it builds the `Dockerfile` itself), so the workflow no longer pushes an image to Docker Hub or deploys over SSH.

## Project Structure

```
src/
├── auth/              # Authentication module
├── blog/              # Blog management
├── common/            # Shared entities and utilities
├── contact/           # Contact form handling
├── backup/            # Database backup and restore (JSON)
├── health/            # Health check endpoint
├── linkedin-posts/    # LinkedIn posts shown on the portfolio
├── profile/           # User profile management
├── projects/          # Project showcase
├── users/             # User management
└── main.ts           # Application entry point
```

## Environment Variables

### Required Variables

- `DB_HOST` - Database host
- `DB_PORT` - Database port
- `DB_USERNAME` - Database username
- `DB_PASSWORD` - Database password
- `DB_DATABASE` - Database name
- `JWT_SECRET` - JWT secret key
- `PORT` - Application port (default: 3000)
- `NODE_ENV` - Environment (development/production)

### Optional: instant frontend refresh

After every create/update/delete made while logged in, the server calls the portfolio's `/api/revalidate` endpoint so changes show up immediately.

- `FRONTEND_REVALIDATE_URL` - e.g. `https://www.fardinrahman.com.bd/api/revalidate`
- `REVALIDATION_SECRET` - long random string; must match `REVALIDATION_SECRET` set on the portfolio (Vercel)

If either is missing the webhook is skipped.

## Backup and Restore

Both endpoints need a valid admin JWT (`Authorization: Bearer <token>`) and are also available in the admin panel under **Backup**.

- `GET /api/backup` downloads `portfolio-backup-<timestamp>.json` with every table (including the `users` table with password hashes, so keep the file private). Uploaded images in `uploads/` are not included.
- `POST /api/backup/restore` (multipart: `file` + `confirm=RESTORE`, max 50 MB) replaces ALL data with the backup. It validates the file (known tables/columns only, no raw SQL), runs in one transaction (all-or-nothing), and first saves a safety copy to `backups/pre-restore-*.json` (last 3 kept; this folder is not persistent unless you mount a volume).

## LinkedIn posts table

Production runs with `synchronize` off, so create the table once before deploying (Postgres 13+):

```sql
CREATE TABLE "linkedin_posts" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
  "url" character varying(500) NOT NULL,
  "caption" text,
  "order" integer NOT NULL DEFAULT 0,
  "isPublished" boolean NOT NULL DEFAULT true,
  CONSTRAINT "PK_linkedin_posts_id" PRIMARY KEY ("id")
);
```

## Section visibility table

Homepage section visibility (which of the 10 sections are shown) is stored in a single row. Production runs with `synchronize` off, so create the table once before deploying (Postgres 13+):

```sql
CREATE TABLE "section_visibility" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
  "sections" jsonb NOT NULL DEFAULT '{}'::jsonb,
  CONSTRAINT "PK_section_visibility_id" PRIMARY KEY ("id")
);
```

`GET /api/section-visibility` is public and returns the map (all sections default to visible when no row exists). `PUT /api/section-visibility` requires an admin JWT.

## Health Check

The application includes a health check endpoint:

```bash
curl http://localhost:3000/health
```

Response:
```json
{
  "status": "ok",
  "info": {
    "database": {
      "status": "up"
    }
  }
}
```

## License

ISC

## Author

Fardin Rahman

---

Built with ❤️ using NestJS
