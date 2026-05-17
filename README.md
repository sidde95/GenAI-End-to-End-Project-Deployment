# GenAI-End-to-End-Project-Deployment

# Intelligent Finance Copilot

A personal finance web application for tracking spending, managing budgets, monitoring investments, and understanding overall financial health through a single dashboard.

> 📄 Full documentation is in [`intelligent-finance-copilot-docs/`](./intelligent-finance-copilot-docs/)

---

## Project Structure

```
├── backend/                    # Node.js + Express + TypeScript REST API
│   ├── src/
│   │   ├── app.ts              # Express app setup
│   │   ├── server.ts           # Server entry point
│   │   ├── middleware/         # Auth, validation, error handling
│   │   ├── lib/                # JWT helpers, Prisma client, error classes
│   │   └── modules/            # Feature modules (routes + controller + service)
│   │       ├── auth/
│   │       ├── profile/
│   │       ├── categories/
│   │       ├── transactions/
│   │       ├── holdings/
│   │       ├── dashboard/
│   │       ├── reports/
│   │       └── budgets/        # ⚠️ PLACEHOLDER — Reserved for user implementation
│   ├── prisma/
│   │   └── schema.prisma       # Database schema (User, Category, Transaction, Budget, Holding)
│   └── tests/                  # Jest unit + integration tests
│
├── frontend/                   # React 18 + TypeScript + Vite SPA
│   ├── src/
│   │   ├── api/                # Axios API client + per-module API calls
│   │   ├── pages/              # Page components (Login, Register, Dashboard, etc.)
│   │   ├── components/         # Layout, ProtectedRoute, ErrorBoundary
│   │   ├── context/            # Auth context (JWT + user state)
│   │   └── types/              # TypeScript interfaces matching backend models
│   └── tests/                  # Vitest + React Testing Library tests
│
├── docker-compose.yml          # Local dev stack (PostgreSQL + Backend + Frontend)
├── .env.example                # Environment variable template
├── .github/
│   └── workflows/
│       └── ci.yml              # CI pipeline (lint + test + build)
└── intelligent-finance-copilot-docs/  # Full 24-document specification
```

---

## How to Run Locally

### Option A — Docker Compose (Recommended)

```bash
# 1. Clone the repo
git clone https://github.com/sidde95/GenAI-End-to-End-Project-Deployment.git
cd GenAI-End-to-End-Project-Deployment

# 2. Start all services (Postgres + Backend + Frontend)
docker compose up --build

# 3. Apply database migrations (first time only)
docker compose exec backend npx prisma migrate dev --name init

# Services available at:
#   Frontend:  http://localhost:5173
#   Backend:   http://localhost:3001
#   Health:    http://localhost:3001/health
```

### Option B — Run Services Individually

**Prerequisites:** Node.js 20+, PostgreSQL 16+

```bash
# 1. Backend setup
cd backend
cp ../.env.example .env        # Edit DATABASE_URL and JWT_SECRET
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev                    # Starts on http://localhost:3001

# 2. Frontend setup (new terminal)
cd frontend
cp ../.env.example .env        # Edit VITE_API_URL if needed
npm install
npm run dev                    # Starts on http://localhost:5173
```

---

## Running Tests

```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

---

## API Overview

All API endpoints are prefixed with `/api/v1`.

| Module | Endpoints | Status |
|--------|-----------|--------|
| Auth | POST /auth/register, /auth/login, /auth/logout | ✅ Implemented |
| Profile | GET/PATCH /profile | ✅ Implemented |
| Categories | GET/POST/PATCH/DELETE /categories | ✅ Implemented |
| Transactions | GET/POST/PATCH/DELETE /transactions | ✅ Implemented |
| Holdings | GET/POST/PATCH/DELETE /holdings, POST /holdings/refresh-prices | ✅ Implemented |
| Dashboard | GET /dashboard/summary | ✅ Implemented |
| Reports | GET /reports/monthly, GET /reports/export | ✅ Implemented |
| **Budgets** | GET/POST/PATCH/DELETE /budgets | ⚠️ **501 — Reserved for user** |
| Health | GET /health | ✅ Implemented |

---

## What Is Implemented vs Placeholder

### ✅ Implemented (Scaffold)
- Full authentication flow (register, login, logout with JWT)
- User profile CRUD
- Category management (income/expense categories per user)
- Transaction management with filtering (date, type, category)
- Portfolio holdings management
- Dashboard summary aggregation endpoint
- Monthly reports + CSV export endpoint
- Standardized error response contract (`{ error: { code, message, details } }`)
- Input validation middleware (Zod schemas)
- JWT authentication middleware
- Global error handler
- Health check endpoint
- Prisma database schema (all entities from DATA_MODEL.md)
- Frontend pages: Login, Register, Dashboard, Transactions, Holdings, Reports
- Frontend API client with auth interceptors
- Docker Compose for local dev
- CI workflow (lint + test + build)

### ⚠️ Budget Module — Reserved for User Implementation

> **This module is intentionally left as a placeholder for you to implement.**

The budget routes exist and return `HTTP 501 Not Implemented`. The database schema for budgets is fully defined. Your task is to implement:

- `backend/src/modules/budgets/budgets.service.ts` — Business logic
  - List budgets for a period
  - Create/upsert budget for a category + period
  - Calculate spent amount vs budget limit
  - Determine budget state: `within_limit` | `near_limit` (>80%) | `over_limit`
- `backend/src/modules/budgets/budgets.controller.ts` — HTTP handlers
- `frontend/src/pages/BudgetsPage.tsx` — Budget UI (currently shows placeholder message)
- `frontend/src/api/budgets.ts` — Frontend API calls (currently stubs)

**Look for `// TODO:` comments** in `budgets.service.ts`, `budgets.controller.ts`, and `BudgetsPage.tsx`.

Refer to these docs for guidance:
- [`intelligent-finance-copilot-docs/FUNCTIONAL_REQUIREMENTS.md`](./intelligent-finance-copilot-docs/FUNCTIONAL_REQUIREMENTS.md) — FR-005 Budget Management
- [`intelligent-finance-copilot-docs/API_SPEC.md`](./intelligent-finance-copilot-docs/API_SPEC.md) — Budget endpoints
- [`intelligent-finance-copilot-docs/DATA_MODEL.md`](./intelligent-finance-copilot-docs/DATA_MODEL.md) — Budget entity

---

## Environment Variables

Copy `.env.example` and fill in your values:

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:password@localhost:5432/finance_copilot` |
| `JWT_SECRET` | Secret key for JWT signing | *(required, no default)* |
| `PORT` | Backend port | `3001` |
| `NODE_ENV` | Environment | `development` |
| `VITE_API_URL` | Backend API base URL (frontend) | `http://localhost:3001/api/v1` |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite, React Router v6 |
| Backend | Node.js, Express, TypeScript |
| ORM | Prisma |
| Database | PostgreSQL 16 |
| Auth | JWT (jsonwebtoken + bcryptjs) |
| Validation | Zod |
| Testing (BE) | Jest + Supertest |
| Testing (FE) | Vitest + React Testing Library |
| Containers | Docker + Docker Compose |
| CI | GitHub Actions |

---

## Documentation

All 24 specification documents are in [`intelligent-finance-copilot-docs/`](./intelligent-finance-copilot-docs/), covering product vision, architecture, data model, API spec, security, testing strategy, DevOps, and operations runbooks.
