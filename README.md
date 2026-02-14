# Fardin Rahman Portfolio Server

Backend API for Fardin Rahman's portfolio website built with NestJS, TypeORM, and PostgreSQL.

## Features

- 🔐 JWT Authentication
- 📝 Blog Management
- 💼 Project Showcase
- 👤 Profile Management
- 📧 Contact Form
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
├── health/            # Health check endpoint
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

### Docker Variables (Production)

- `DOCKER_USERNAME` - Docker Hub username
- `PACKAGE_NAME` - Docker image name
- `PACKAGE_VERSION` - Docker image version

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
