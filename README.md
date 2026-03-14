# HomeMeal

A platform that connects students with homemakers who cook healthy home meals.

- **Students**: Browse meal plans, subscribe, track deliveries, give feedback and vote for menu changes.
- **Homemakers (Makers)**: Add meals and weekly menus, manage orders, view student subscriptions.
- **Admin**: Manage users, monitor orders, approve homemakers, view analytics.

---

## Project structure

```
Homemeal/
├── backend/          # Node.js + Express + MongoDB (MVC)
├── homemeal-main/    # React frontend (Vite + Tailwind)
└── README.md
```

To match the preferred layout `homemeal/frontend` and `homemeal/backend`, you can rename `homemeal-main` to `frontend`.

---

## Prerequisites

- **Node.js** 18+
- **MongoDB** (local or Atlas). Install locally or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and set `MONGO_URI` in backend `.env`.

---

## Backend (API)

### 1. Install packages

```bash
cd backend
npm install
```

### 2. Environment

Copy the example env and set your values:

```bash
cp .env.example .env
```

Edit `.env`:

- `PORT` – server port (default `5000`)
- `MONGO_URI` – MongoDB connection string (default `mongodb://127.0.0.1:27017/homemeal`)
- `JWT_SECRET` – secret for JWT (change in production)
- `FRONTEND_URL` – frontend origin for CORS (e.g. `http://localhost:5173`)

### 3. Create admin user (optional)

```bash
npm run seed:admin
```

Creates: **admin@homemeal.com** / **admin123**. Change the password after first login.

### 4. Run the server

```bash
npm run dev
```

API runs at **http://localhost:5000**. Health: `GET http://localhost:5000/api/health`.

---

## Frontend

### 1. Install packages

```bash
cd homemeal-main
npm install
```

### 2. Environment (optional)

To use a different API URL:

```bash
cp .env.example .env
```

Set `VITE_API_URL` (e.g. `http://localhost:5000/api`). Default is `http://localhost:5000/api`.

### 3. Run the app

```bash
npm start
```

Or:

```bash
npm run dev
```

Frontend runs at **http://localhost:5173** (or the port in `vite.config.js`).

---

## Quick start (both)

1. Start MongoDB.
2. Terminal 1 – backend:
   ```bash
   cd backend && npm install && npm run dev
   ```
3. Terminal 2 – frontend:
   ```bash
   cd homemeal-main && npm install && npm start
   ```
4. Optional: run `npm run seed:admin` in `backend` to create the admin user, then log in with **admin@homemeal.com** / **admin123**.

---

## Backend stack & structure (MVC)

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT

### Folders

| Folder        | Purpose                          |
|---------------|-----------------------------------|
| `config/`     | DB connection                     |
| `models/`     | Mongoose schemas (User, Meal, etc.) |
| `controllers/`| Request handlers                  |
| `routes/`     | API routes                        |
| `middleware/` | Auth (JWT) and role checks         |
| `scripts/`    | Seed (e.g. admin user)            |

### Main API routes

- `POST /api/auth/register` – register (student/homemaker)
- `POST /api/auth/login` – login
- `GET /api/auth/me` – current user (requires JWT)
- `GET /api/meals` – list meals (query: `homemaker_id`, `availability`, `search`)
- `GET /api/meals/:id` – meal by id
- `POST /api/meals` – create meal (homemaker, approved)
- `PUT /api/meals/:id` – update meal (homemaker)
- `DELETE /api/meals/:id` – delete meal (homemaker)
- `POST /api/subscriptions` – create subscription (student)
- `GET /api/subscriptions/my` – my subscriptions
- `POST /api/orders` – create order
- `GET /api/orders/my` – my orders
- `GET /api/orders/homemaker` – orders for homemaker’s meals
- `PUT /api/orders/:id/status` – update delivery status
- `POST /api/feedback` – submit feedback
- `GET /api/feedback/meal/:mealId` – feedback for a meal
- `GET /api/admin/users` – list users (admin)
- `PUT /api/admin/users/:id` – update user (admin)
- `POST /api/admin/users/:id/approve-homemaker` – approve homemaker (admin)
- `GET /api/admin/analytics` – analytics (admin)
- `GET /api/admin/orders` – all orders (admin)

---

## Frontend stack

- React 18, Vite, React Router
- Tailwind CSS
- Framer Motion, Recharts, Lucide React, React Icons

---

## Packages to install

### Backend (`backend/`)

Already in `package.json`; install with `npm install`:

- `express` – web framework
- `mongoose` – MongoDB ODM
- `bcryptjs` – password hashing
- `jsonwebtoken` – JWT
- `cors` – CORS
- `dotenv` – env variables

### Frontend (`homemeal-main/`)

Already in `package.json`; install with `npm install`:

- `react`, `react-dom`, `react-router-dom`
- `@tailwindcss/vite`, `tailwindcss`
- `framer-motion`, `recharts`, `lucide-react`, `react-icons`
- No extra package is required for API calls (uses `fetch`).

If you prefer **axios** for the frontend:

```bash
cd homemeal-main && npm install axios
```

Then in `src/api.js` you can replace `fetch` with `axios` (base URL + interceptors for the token). The current `fetch`-based client works without axios.
