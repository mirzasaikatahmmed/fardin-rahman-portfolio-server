# Fardin Rahman Portfolio Server

A comprehensive backend API for Fardin Rahman's portfolio website built with NestJS, TypeORM, and PostgreSQL.

## Features

- **Authentication Module**: JWT-based authentication with Passport
- **Projects Module**: Manage portfolio projects with CRUD operations
- **Blog Module**: Blog post management with slug-based routing
- **Contact Module**: Handle contact form submissions
- **Profile Module**: Manage profile information, skills, experience, and education

## Tech Stack

- **Framework**: NestJS
- **ORM**: TypeORM
- **Database**: PostgreSQL
- **Validation**: class-validator, class-transformer
- **API Documentation**: Swagger/OpenAPI

## Prerequisites

- Node.js (v20+)
- PostgreSQL (v12+)
- npm or yarn

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

### Development mode:
```bash
npm run start:dev
```

### Production mode:
```bash
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000/api`
The Swagger documentation will be available at `http://localhost:3000/api/docs`

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

## License

ISC
