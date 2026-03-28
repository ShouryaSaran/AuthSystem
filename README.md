# BackendAuthSystem API

Scalable REST API built with Express + MongoDB, featuring JWT authentication, role-based access control, and Tasks CRUD.

## Features Implemented

- API versioning: `/api/v1/*`
- Authentication: register, login, logout, get profile
- Password hashing with `bcryptjs`
- JWT auth via httpOnly cookie
- Role-based access (`user`, `admin`)
- Tasks CRUD for secondary entity
- Request validation and sanitization (`express-validator`)
- Centralized error handling middleware
- Swagger documentation at `/api-docs`

## Tech Stack

- Node.js, Express
- MongoDB + Mongoose
- JWT + Cookies
- Swagger (OpenAPI)

## Project Structure

- `src/Controller` business logic
- `src/Router/v1` versioned API routes
- `src/Middleware` auth, role, validation, errors
- `src/Models` MongoDB schemas
- `src/Validators` request validators
- `src/Docs/swagger.js` OpenAPI setup

## Setup

1. Install dependencies:
   - `npm install`
2. Configure env file:
   - `MONGO_URI=your_mongodb_connection_string`
   - `JWT_SECRET=your_long_random_secret`
   - `PORT=3000`
   - `CLIENT_ORIGIN=http://localhost:5173`
3. Start server:
   - Development: `npm run dev`
   - Production: `npm start`

## API Endpoints

### Auth

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`
- `GET /api/v1/auth/admin/users` (admin only)

### Tasks

- `POST /api/v1/tasks`
- `GET /api/v1/tasks`
- `GET /api/v1/tasks/:id`
- `PATCH /api/v1/tasks/:id`
- `DELETE /api/v1/tasks/:id`

## Security Notes

- Passwords are hashed before storage.
- JWT is stored in httpOnly cookie.
- Token blacklist supports logout invalidation.
- Input validation is enforced for auth and task payloads.

## Scalability Note

Current design is modular and can scale by:

- Splitting modules into microservices (`auth-service`, `task-service`)
- Adding Redis for caching session/token metadata and hot task queries
- Introducing message queues for async workload
- Horizontal scaling behind a load balancer
- Adding structured logs and centralized monitoring

## API Docs and Postman

- Swagger UI: `http://localhost:3000/api-docs`
- Postman collection: `BackendAuthSystem.postman_collection.json`
