# Fardin Rahman Portfolio Server

A comprehensive backend API for Fardin Rahman's portfolio website built with NestJS, TypeORM, and PostgreSQL.

## Features

- **Authentication Module**: JWT-based authentication with Passport
- **Projects Module**: Manage portfolio projects with CRUD operations
- **Blog Module**: Blog post management with slug-based routing
- **Contact Module**: Handle contact form submissions
- **Profile Module**: Manage profile information, skills, experience, and education
- **Docker Support**: Containerized application with Docker and Docker Compose
- **CI/CD Pipeline**: Automated testing, building, and deployment to Docker Hub

## Tech Stack

- **Framework**: NestJS
- **ORM**: TypeORM
- **Database**: PostgreSQL
- **Validation**: class-validator, class-transformer
- **API Documentation**: Swagger/OpenAPI
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions

## Prerequisites

### For Local Development
- Node.js (v20+)
- PostgreSQL (v12+)
- npm or yarn

### For Docker Development
- Docker
- Docker Compose

## Quick Start with Docker 🐳

The fastest way to get started is using Docker Compose:

```bash
# Clone the repository
git clone <repository-url>
cd fardin-rahman-portfolio-server

# Create environment file
cp .env.example .env

# Start all services (PostgreSQL + App)
docker-compose up -d

# View logs
docker-compose logs -f
```

The API will be available at:
- **API**: http://localhost:3000/api
- **Swagger Docs**: http://localhost:3000/api/docs
- **Health Check**: http://localhost:3000/api/health

For detailed Docker setup and CI/CD documentation, see [DOCKER_SETUP.md](./DOCKER_SETUP.md)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd test_project
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update `.env` with your database credentials and JWT secret:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=portfolio_db
PORT=3000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h
```

5. Create the PostgreSQL database:
```bash
createdb portfolio_db
```

## Running the Application

### Option 1: Using Docker Compose (Recommended)

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild after code changes
docker-compose up -d --build
```

### Option 2: Local Development

#### Development mode:
```bash
npm run start:dev
```

#### Production mode:
```bash
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000/api`
The Swagger documentation will be available at `http://localhost:3000/api/docs`

## Docker & CI/CD

This project includes:
- **Dockerfile**: Multi-stage build for optimized production images
- **docker-compose.yml**: Complete development environment with PostgreSQL
- **GitHub Actions**: Automated CI/CD pipeline

### CI/CD Pipeline

The GitHub Actions workflow automatically:
1. ✅ Runs tests on every push
2. ✅ Builds Docker images
3. ✅ Pushes to Docker Hub
4. ✅ Tests Docker Compose setup

### Docker Hub Setup

To enable automatic Docker Hub publishing:

1. Create a Docker Hub account at [hub.docker.com](https://hub.docker.com)
2. Generate an access token in Docker Hub settings
3. Add GitHub secrets to your repository:
   - `DOCKER_USERNAME`: Your Docker Hub username
   - `DOCKER_PASSWORD`: Your Docker Hub access token

For complete Docker and CI/CD documentation, see [DOCKER_SETUP.md](./DOCKER_SETUP.md)

## API Documentation

Interactive API documentation is available via Swagger UI at:
- **Swagger UI**: `http://localhost:3000/api/docs`

The Swagger documentation provides:
- Complete API endpoint documentation
- Request/response schemas
- Try-it-out functionality
- Example requests and responses

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. See [AUTH_API.md](./AUTH_API.md) for detailed authentication documentation.

### Quick Start

1. Register a user:
```bash
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "Password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

2. Login to get a token:
```bash
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "Password123"
}
```

3. Use the token in protected endpoints:
```bash
Authorization: Bearer <your-jwt-token>
```

## API Endpoints

### Health Check
- `GET /api/health` - Health check endpoint (public)

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/profile` - Get current user profile (protected)
- `GET /api/auth/me` - Get current authenticated user (protected)

### Projects
- `GET /api/projects` - Get all projects (optional query: `?published=true`)
- `GET /api/projects/:id` - Get a single project
- `POST /api/projects` - Create a new project
- `PATCH /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project

### Blog
- `GET /api/blog` - Get all blog posts (optional query: `?published=true`)
- `GET /api/blog/:id` - Get a single blog post by ID
- `GET /api/blog/slug/:slug` - Get a blog post by slug
- `POST /api/blog` - Create a new blog post
- `PATCH /api/blog/:id` - Update a blog post
- `DELETE /api/blog/:id` - Delete a blog post

### Contact
- `POST /api/contact` - Submit a contact message
- `GET /api/contact` - Get all contact messages
- `GET /api/contact/unread-count` - Get count of unread messages
- `GET /api/contact/:id` - Get a single contact message
- `PATCH /api/contact/:id/read` - Mark message as read
- `PATCH /api/contact/:id/status` - Update message status
- `DELETE /api/contact/:id` - Delete a contact message

### Profile
- `GET /api/profile` - Get profile information
- `POST /api/profile` - Create profile
- `PATCH /api/profile/:id` - Update profile

#### Skills
- `GET /api/profile/skills` - Get all skills (optional query: `?active=true`)
- `GET /api/profile/skills/:id` - Get a single skill
- `POST /api/profile/skills` - Create a skill
- `PATCH /api/profile/skills/:id` - Update a skill
- `DELETE /api/profile/skills/:id` - Delete a skill

#### Experience
- `GET /api/profile/experiences` - Get all experiences
- `GET /api/profile/experiences/:id` - Get a single experience
- `POST /api/profile/experiences` - Create an experience
- `PATCH /api/profile/experiences/:id` - Update an experience
- `DELETE /api/profile/experiences/:id` - Delete an experience

#### Education
- `GET /api/profile/educations` - Get all educations
- `GET /api/profile/educations/:id` - Get a single education
- `POST /api/profile/educations` - Create an education
- `PATCH /api/profile/educations/:id` - Update an education
- `DELETE /api/profile/educations/:id` - Delete an education

## Database Schema

The application uses the following main entities:

- **Projects**: Portfolio projects with title, description, images, URLs, and technologies
- **BlogPosts**: Blog entries with title, content, slug, tags, and publishing status
- **ContactMessages**: Contact form submissions with name, email, subject, and message
- **Profile**: User profile information with bio, social links, and resume
- **Skills**: Technical skills with category, proficiency level, and icon
- **Experience**: Work experience entries with company, title, dates, and description
- **Education**: Education entries with degree, institution, dates, and certificate

## Project Structure

```
src/
├── common/
│   └── entities/
│       └── base.entity.ts       # Base entity with common fields
├── projects/
│   ├── dto/
│   ├── entities/
│   ├── projects.controller.ts
│   ├── projects.service.ts
│   └── projects.module.ts
├── blog/
│   ├── dto/
│   ├── entities/
│   ├── blog.controller.ts
│   ├── blog.service.ts
│   └── blog.module.ts
├── contact/
│   ├── dto/
│   ├── entities/
│   ├── contact.controller.ts
│   ├── contact.service.ts
│   └── contact.module.ts
├── profile/
│   ├── dto/
│   ├── entities/
│   ├── profile.controller.ts
│   ├── profile.service.ts
│   └── profile.module.ts
├── app.module.ts
└── main.ts
```

## Development

### Build
```bash
npm run build
```

### Format code
```bash
npm run format
```

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Get started in 5 minutes
- **[DOCKER_SETUP.md](./DOCKER_SETUP.md)** - Complete Docker guide
- **[GITHUB_ACTIONS_SETUP.md](./GITHUB_ACTIONS_SETUP.md)** - CI/CD setup guide

## 🐳 Docker Images

After setting up CI/CD, your images will be available at:

```bash
docker pull your-username/fardin-rahman-portfolio-server:latest
```

Available tags:
- `latest` - Latest build from main branch
- `main` - Latest main branch build
- `v1.0.0` - Semantic version tags
- `main-abc123` - Specific commit builds

## 🔄 CI/CD Pipeline

The GitHub Actions workflow automatically:
1. Tests the application
2. Builds Docker images (multi-platform)
3. Pushes to Docker Hub
4. Tests Docker Compose setup

Workflow runs on:
- Push to `main` or `develop` branches
- Pull requests
- Git tags (e.g., `v1.0.0`)

## 🚀 Deployment

### Development

```bash
docker-compose up -d
```

### Production

```bash
# Using pre-built image from Docker Hub
docker-compose -f docker-compose.prod.yml up -d
```

## 🔒 Security Notes

- Never commit `.env` files
- Use strong passwords in production
- Rotate JWT secrets regularly
- Keep Docker images updated
- Use HTTPS in production
- Enable Docker Hub 2FA

## License

ISC
