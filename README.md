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

### Development

```bash
docker compose --profile dev up -d
```

### Production

Uses image from `.env`: `DOCKER_USERNAME/PACKAGE_NAME:PACKAGE_VERSION`

```bash
docker compose --profile prod up -d
```

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

1. **Lint, Format, Build** (All branches)
   - Code linting with ESLint
   - Format checking with Prettier
   - Build verification

2. **Build and Push Docker Image** (main branch only)
   - Build Docker image
   - Push to Docker Hub

3. **Deploy to Production** (main branch only)
   - Copy compose.yaml to server
   - Check Cloudflare tunnel status
   - Pull latest Docker image
   - Deploy with zero downtime

### Required GitHub Secrets

Configure these secrets in your GitHub repository:

- `DOCKER_USERNAME` - Docker Hub username
- `DOCKER_PASSWORD` - Docker Hub password/token
- `PACKAGE_NAME` - Docker package name (e.g., fardin-rahman-portfolio-server)
- `PACKAGE_VERSION` - Docker image version tag (e.g., latest)
- `VPS_HOST` - SSH host (e.g., ssh.saikat.com.bd)
- `VPS_USER` - SSH username (e.g., saikat)
- `VPS_SSH_PRIVATE_KEY` - SSH private key for authentication

### Deployment Path

The application is deployed to: `/home/saikat/apps/fardin-rahman-portfolio-server`

### Cloudflare Tunnel

The deployment script automatically checks if the Cloudflare tunnel service is running and starts it if needed. Make sure `cloudflared` is configured as a systemd service on your server.

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

### Docker Variables (Production)

- `DOCKER_USERNAME` - Docker Hub username
- `PACKAGE_NAME` - Docker image name
- `PACKAGE_VERSION` - Docker image version

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
