# Incident Tracker Mini App

> A production-grade Incident Tracker built with Node.js/Express and Next.js.

## 🚀 Overview

This application is a full-stack incident management system designed to simulate a real-world SaaS internal tool. It features a robust REST API backend and a modern, responsive React frontend.

### Key Features

*   **RESTful API**: Fully typed, validated (Zod), and documented.
*   **Server-Side Pagination**: Efficient data handling with offset-based pagination, sorting, and filtering.
*   **Database**: PostgreSQL with Prisma ORM, featuring optimized indexes.
*   **Modern UI**: Built with Next.js App Router, TailwindCSS, and TanStack Query.
*   **Performance**: Debounced search, server-state management, and loading skeletons.
*   **Seeding**: Includes a script to generate ~200 realistic incident records.

## 🛠 Tech Stack

**Backend**
*   **Runtime**: Node.js
*   **Framework**: Express
*   **Database**: PostgreSQL
*   **ORM**: Prisma
*   **Validation**: Zod
*   **Language**: TypeScript

**Frontend**
*   **Framework**: Next.js (App Router)
*   **Styling**: TailwindCSS
*   **State Management**: TanStack Query (React Query)
*   **Icons**: Lucide React
*   **Language**: TypeScript

## 📦 Setup Instructions

### Prerequisites
*   Node.js (v18+)
*   Docker (for PostgreSQL)

### 1. Database Setup

Start the PostgreSQL container:

```bash
docker run --name incident-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=incident_tracker -p 5432:5432 -d postgres
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Run database migrations and seed data:

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

Start the backend server:

```bash
npm run dev
# Server running at http://localhost:3001
```

### 3. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
# App running at http://localhost:3000
```

## 🔌 API Overview

### `GET /api/incidents`
Retrieve a paginated list of incidents.
*   **Query Params**:
    *   `page`: Page number (default: 1)
    *   `limit`: Items per page (default: 10)
    *   `search`: Search title or summary
    *   `status`: Filter by status
    *   `severity`: Filter by severity
    *   `sortBy`: Field to sort by (`createdAt`, `severity`, `status`)
    *   `sortOrder`: `asc` or `desc`

### `POST /api/incidents`
Create a new incident.
*   **Body**: JSON object with `title`, `service`, `severity`, `status`, etc.

### `GET /api/incidents/:id`
Get details of a specific incident.

### `PATCH /api/incidents/:id`
Update an incident.

## 🧠 Design Decisions & Tradeoffs

1.  **Framework Choice**: Next.js App Router was chosen for the frontend to leverage server components where possible (though this app relies heavily on client-side interactivity via React Query for the dashboard).
2.  **State Management**: TanStack Query was selected over Redux/Context for simpler, more robust server-state synchronization (caching, invalidation, loading states).
3.  **Database Indexing**: Indexes added on `createdAt`, `severity`, `status`, and `service` to optimize frequent filtering and sorting queries.
4.  **Prisma Version**: Downgraded to v5 to ensure stability with standard configuration patterns, avoiding breaking changes in newer experimental versions.
5.  **Styling**: Used raw TailwindCSS for maximum flexibility and performance without the runtime overhead of heavy UI libraries.

## 🔮 Future Improvements

*   **Authentication**: Add JWT-based auth to secure endpoints.
*   **Real-time Updates**: Implement WebSockets (Socket.io) to push incident updates to the dashboard instantly.
*   **Advanced Filtering**: precise date range filtering.
*   **Testing**: Add Jest/Vitest unit tests and Playwright E2E tests.
