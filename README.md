# Krushi Gain

A modern full-stack platform that helps farmers identify the most profitable mandi by comparing prices, transport cost, and predicted returns.

## Tech Stack

- Frontend: React.js + Tailwind CSS
- Backend: Node.js + Express.js
- Database: MongoDB
- Authentication: JWT

## Project Structure

- `frontend/`
  - `src/components`
  - `src/pages`
  - `src/hooks`
  - `src/services`
- `backend/`
  - `src/routes`
  - `src/controllers`
  - `src/models`
  - `src/middleware`

## Features

### Public Website

- Home
- About
- Blogs
- Contact
- Sticky navbar with Login / Sign Up

### Authentication

- Sign Up
- Login
- JWT-based protected routes

### Protected Dashboard

- Dashboard
- Mandi Analysis
- My History
- Profile
- Logout

### Mandi Analysis Output

- Current Mandi Price
- Predicted Price
- Recommended Mandi
- Distance
- Transport Cost
- Expected Profit
- Profit comparison chart

## API Endpoints

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/user/profile` (protected)
- `POST /api/mandi/analyze` (protected)
- `GET /api/mandi/history` (protected)
- `GET /api/blogs`

## Environment Setup

### Backend

1. Copy `backend/.env.example` to `backend/.env`
2. Update values:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `CLIENT_URL`

### Frontend

1. Copy `frontend/.env.example` to `frontend/.env`
2. Update `VITE_API_URL` if needed

## Run Locally

### Start backend

```bash
cd backend
npm install
npm run dev
```

### Start frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` and backend on `http://localhost:5001` by default.
