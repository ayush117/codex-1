# AI Job Application Platform MVP

Production-ready MVP inspired by AI-assisted job automation tools.

## Stack

- Backend: Node.js, Express, PostgreSQL, OpenAI API, JWT
- Frontend: React (Vite), Tailwind CSS, Axios

## Project Structure

```
/backend
  /controllers
  /routes
  /services
  /models
  /middleware
  app.js
/frontend
  /src
    /pages
    /components
    /api
    /hooks
```

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- OpenAI API key

## Backend Setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

The backend runs on `http://localhost:5000`.

### Backend Environment Variables

See `backend/.env.example`:

- `PORT`
- `DATABASE_URL`
- `JWT_SECRET`
- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `FRONTEND_URL`

## Frontend Setup

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

## API Endpoints

### Auth
- `POST /auth/register`
- `POST /auth/login`

### Profile
- `GET /profile`
- `PUT /profile`

### Jobs
- `GET /jobs`
- `POST /jobs/cover-letter`

### Applications
- `POST /applications`
- `GET /applications`
- `PUT /applications/:id`

## Database

Tables are auto-created at backend startup:

- `users`
- `applications`

## MVP Features Delivered

- JWT auth (register/login)
- Profile API (name, skills, experience)
- Mock job listing service
- AI cover letter generation via OpenAI
- Application tracking with status updates
- Dashboard stats
- Jobs + cover letter + apply workflow
- Application tracker table
- Loading states + basic toast notifications
