# MERN Notes App

A simple notes app: create, read, update, delete notes.

**Stack:** MongoDB (Atlas) + Express + React (Vite) + Node.js

## Setup

### 1. Backend
```
cd server
npm install
cp .env.example .env     # then edit .env with your MongoDB Atlas connection string
npm run dev
```
Runs on http://localhost:5000

### 2. Frontend (new terminal)
```
cd client
npm install
npm run dev
```
Runs on http://localhost:5173

## API Endpoints

| Method | Endpoint          | Description     | Success |
|--------|-------------------|-----------------|---------|
| GET    | /api/notes        | Get all notes   | 200     |
| POST   | /api/notes        | Create a note   | 201     |
| PUT    | /api/notes/:id    | Update a note   | 200     |
| DELETE | /api/notes/:id    | Delete a note   | 200     |

Errors: 400 (bad input), 404 (not found), 500 (server error)

## Possible next steps
Search, tags, pagination, user login (JWT), deployment (Render + Vercel).
