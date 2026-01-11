# Scheduler (Auth + Dashboard + Tasks)

This repo contains:
- `backend/`: Node.js/Express + MongoDB API (JWT auth, profile, tasks CRUD)
- `Frontend/`: React (Vite) + Tailwind responsive UI (login/register/dashboard)

## Quick start

### 1) Backend

```bash
cd backend
cp .env.example .env
# edit .env with your MongoDB URL + JWT_SECRET
npm install
npm start
```

Backend runs on: `http://localhost:5000`

### 2) Frontend

```bash
cd Frontend
cp .env.example .env
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

## API (what the frontend uses)

- **Auth**
  - `POST /api/v1/user/signup`
  - `POST /api/v1/user/login`
  - `POST /api/v1/user/logout`
- **Profile**
  - `GET /api/v1/user/me`
  - `PUT /api/v1/user/me`
- **Tasks (protected)**
  - `GET /api/v1/task?q=&completed=`
  - `POST /api/v1/task`
  - `PATCH /api/v1/task/:id`
  - `DELETE /api/v1/task/:id`

See `backend/API.md` and `backend/postman_collection.json`.

