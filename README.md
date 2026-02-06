# Product Management System

A production-grade, full-stack **TypeScript** product catalog built with **Next.js (SSR)**, **Express.js**, and **MongoDB** — featuring **cursor-based pagination**, real-time search, category filtering, and a modular architecture designed for scalability.

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 16, React 19, TypeScript 5 | SSR, UI components, routing |
| **Backend** | Express.js 5, Node.js, TypeScript 5 | REST API, business logic |
| **Database** | MongoDB + Mongoose 9 | Document storage, indexing |
| **HTTP Client** | Axios | API communication |
| **Styling** | CSS Modules | Component-scoped, zero-conflict styles |

---

## Features

### Functional
- **Server-Side Rendering** — First page rendered on server via `getServerSideProps` for SEO & instant load
- **Cursor-Based Pagination** — Infinite scroll + Load More button using MongoDB `_id` as cursor
- **Product Search** — Debounced real-time search by product name with regex escaping
- **Category Filter** — Filter by Electronics, Clothing, Books, Food
- **Add Product** — Validated form with success/error feedback
- **Inventory Dashboard** — Live counts for total, in-stock, and out-of-stock products

### Technical
- **Strict TypeScript** — `strict: true`, `noImplicitAny: true`, zero `any` types across entire codebase
- **Enums** — `ProductCategory`, `HttpStatus`, `SortOrder` for type-safe constants
- **Constants Objects** — `PAGINATION_CONSTANTS`, `API_ENDPOINTS` using `as const`
- **Type Interfaces** — `IProduct`, `IPaginatedResponse<T>`, `ICursorPaginationRequest`
- **Modular Architecture** — Controller → Service → Model separation (backend); Components → Hooks → Services (frontend)
- **Centralized Error Handling** — Express middleware catches all errors with consistent JSON responses
- **Input Validation & Sanitization** — Trimmed strings, length caps, escaped regex, safe number parsing
- **Graceful Shutdown** — Handles `SIGTERM`/`SIGINT` for clean database disconnection in production
- **Request Timeouts** — 30-second timeout per request to prevent hung connections
- **CORS** — Configurable origin restriction
- **Environment Management** — Separate `.env.test` and `.env.production` with startup validation

---

## Project Structure

```
product-management/
├── server/                             # Express.js Backend
│   ├── src/
│   │   ├── server.ts                   # App bootstrap, DB connection, graceful shutdown
│   │   ├── config/
│   │   │   └── env.config.ts           # Environment validation & typed config export
│   │   ├── constants/
│   │   │   └── app.constants.ts        # Enums (ProductCategory, HttpStatus, SortOrder),
│   │   │                               #   PAGINATION_CONSTANTS, API_ENDPOINTS
│   │   ├── types/
│   │   │   ├── product.types.ts        # IProduct interface
│   │   │   └── pagination.types.ts     # IPaginatedResponse<T>, ICursorPaginationRequest
│   │   ├── models/
│   │   │   └── Product.model.ts        # Mongoose schema with indexes on name & category
│   │   ├── controllers/
│   │   │   └── product.controller.ts   # Thin HTTP handlers — parse, delegate, respond
│   │   ├── services/
│   │   │   └── product.service.ts      # Business logic: pagination, search, CRUD
│   │   ├── routes/
│   │   │   └── product.routes.ts       # Route definitions
│   │   ├── middleware/
│   │   │   └── error.middleware.ts      # AppError class + global error handler
│   │   └── utils/
│   │       └── validation.ts           # parseLimit, parseCategory, sanitizeSearchQuery,
│   │                                   #   validateCreateProductPayload
│   ├── .env.test                       # Development environment variables
│   ├── .env.production                 # Production environment variables
│   ├── .env.example                    # Template for environment setup
│   ├── package.json
│   └── tsconfig.json                   # strict: true, noImplicitAny: true
│
├── client/                             # Next.js Frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── index.tsx               # Home — SSR via getServerSideProps
│   │   │   ├── _app.tsx                # App wrapper with ErrorBoundary
│   │   │   ├── _document.tsx           # HTML document (lang="en")
│   │   │   └── 404.tsx                 # Custom 404 page
│   │   ├── components/
│   │   │   ├── ProductCard.tsx         # Single product card display
│   │   │   ├── ProductList.tsx         # Grid with IntersectionObserver + Load More
│   │   │   ├── AddProductForm.tsx      # Product creation form with validation
│   │   │   ├── ErrorBoundary.tsx       # React error boundary
│   │   │   └── *.module.css            # Component-scoped styles
│   │   ├── hooks/
│   │   │   └── useInfiniteProducts.ts  # Custom hook: cursor state, loadMore, refresh
│   │   ├── services/
│   │   │   └── product.service.ts      # Axios API client (fetchProducts, createProduct)
│   │   ├── types/
│   │   │   └── product.types.ts        # IProduct, IPaginatedResponse<T>,
│   │   │                               #   ICursorPaginationRequest, IProductCreatePayload
│   │   ├── constants/
│   │   │   └── app.constants.ts        # ProductCategory enum, PAGINATION_CONSTANTS
│   │   └── styles/
│   │       ├── globals.css             # CSS variables, typography, dark theme
│   │       ├── Home.module.css         # Home page layout
│   │       └── NotFound.module.css     # 404 page styles
│   ├── .env.test                       # Development: NEXT_PUBLIC_API_URL
│   ├── .env.production                 # Production: NEXT_PUBLIC_API_URL
│   ├── .env.example                    # Template for environment setup
│   ├── next.config.ts                  # reactStrictMode: true
│   ├── package.json
│   └── tsconfig.json                   # strict: true, jsx: preserve
│
├── .env.example                        # Combined server + client template
├── .gitignore                          # Ignores node_modules, dist, .env.test, .env.production
└── README.md
```

---

## Getting Started

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | 18+ |
| npm | 9+ |
| MongoDB | 6+ (local) or Atlas |
| Git | 2.30+ |

### 1. Clone & Install

```bash
git clone https://github.com/TejeswarAchari/product-management.git
cd product-management
```

```bash
# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### 2. Configure Environment

```bash
# Server
cd server
cp .env.example .env.test
cp .env.example .env.production
# Edit .env.production with your MongoDB Atlas URI and domain

# Client
cd ../client
cp .env.example .env.test
cp .env.example .env.production
# Edit .env.production with your deployed API URL
```

**Server `.env.test`** (development):
```dotenv
NODE_ENV=test
PORT=5001
MONGODB_URI=mongodb://localhost:27017/products_test
CORS_ORIGIN=http://localhost:3000
```

**Server `.env.production`**:
```dotenv
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/products
CORS_ORIGIN=https://yourdomain.com
```

**Client `.env.test`** (development):
```dotenv
NEXT_PUBLIC_API_URL=http://localhost:5001
```

**Client `.env.production`**:
```dotenv
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### 3. Start Development Servers

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
# → Server running on http://localhost:5001
# → Loads .env.test automatically (NODE_ENV defaults to test)
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
# → Client running on http://localhost:3000
# → Falls back to http://localhost:5001 if NEXT_PUBLIC_API_URL is unset
```

---

## Production Build & Deployment

### Backend
```bash
cd server
npm run build           # Compiles TypeScript → dist/
npm start               # Runs with NODE_ENV=production, loads .env.production
```

### Frontend
```bash
cd client
npm run build           # Next.js production build (loads .env.production)
npm start               # Starts production server on port 3000
```

### Switching Environments

The server automatically selects the correct `.env` file based on `NODE_ENV`:

| Command | NODE_ENV | Env File Loaded |
|---------|----------|-----------------|
| `npm run dev` | test (default) | `.env.test` |
| `npm start` | production | `.env.production` |
| `npm run start:test` | test | `.env.test` |

The `env.config.ts` module **validates all required variables at startup** — if any are missing, the server throws immediately with a descriptive error instead of failing silently later.

---

## API Endpoints

### `GET /api/products`

Fetch paginated products with optional category filter.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `cursor` | string | No | MongoDB `_id` for cursor-based pagination |
| `limit` | number | No | Items per page (default: 10, max: 50) |
| `category` | string | No | Filter: `ELECTRONICS`, `CLOTHING`, `BOOKS`, `FOOD` |

```bash
# First page
curl "http://localhost:5001/api/products?limit=10"

# Next page (using cursor from previous response)
curl "http://localhost:5001/api/products?cursor=507f1f77bcf86cd799439011&limit=10"

# Filtered
curl "http://localhost:5001/api/products?category=ELECTRONICS&limit=10"
```

**Response:**
```json
{
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Laptop Pro",
      "description": "High-performance laptop with 16GB RAM",
      "price": 999.99,
      "category": "ELECTRONICS",
      "stock": 5,
      "createdAt": "2026-02-06T10:00:00.000Z"
    }
  ],
  "pagination": {
    "nextCursor": "507f1f77bcf86cd799439012",
    "hasMore": true
  },
  "stats": {
    "total": 50,
    "inStock": 42,
    "outOfStock": 8
  }
}
```

### `POST /api/products`

Create a new product with server-side validation.

**Request Body:**
```json
{
  "name": "Wireless Mouse",
  "description": "Ergonomic wireless mouse with USB-C",
  "price": 29.99,
  "category": "ELECTRONICS",
  "stock": 100
}
```

**Validation Rules:**
- `name` — Required, trimmed, max 120 chars
- `description` — Required, trimmed, max 2000 chars
- `price` — Required, finite number ≥ 0
- `stock` — Required, integer ≥ 0
- `category` — Required, must be valid `ProductCategory` enum value

### `GET /api/products/search`

Search products by name with optional category filter. Supports cursor pagination.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `q` | string | **Yes** | Search query (case-insensitive, regex-escaped) |
| `cursor` | string | No | Pagination cursor |
| `limit` | number | No | Items per page |
| `category` | string | No | Category filter |

```bash
curl "http://localhost:5001/api/products/search?q=laptop&limit=10"
```

---

## Architecture

### Backend — Controller → Service → Model

```
HTTP Request
    │
    ▼
┌─────────────────┐
│   Routes         │  Route definitions (product.routes.ts)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Controller     │  Parse request, validate input, delegate to service
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Service        │  Business logic, database queries, cursor math
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Model          │  Mongoose schema, indexes, data validation
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   MongoDB        │  Document storage
└─────────────────┘

  Error at any layer → caught by error.middleware.ts → consistent JSON response
```

### Frontend — Pages → Components → Hooks → Services

```
getServerSideProps (SSR)
    │
    ▼
┌─────────────────┐
│   index.tsx      │  Page component with SSR initial data
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌────────┐ ┌──────────────┐
│ Form   │ │ ProductList   │  Grid + IntersectionObserver + Load More
└────────┘ └──────┬───────┘
                  │
                  ▼
           ┌──────────────┐
           │ ProductCard   │  Individual product display
           └──────────────┘

  useInfiniteProducts (hook)  →  product.service.ts (Axios)  →  Backend API
```

### Cursor-Based Pagination — How It Works

```
Client Request: GET /api/products?limit=3

Server Logic:
  1. Fetch limit + 1 documents (4 in this case)
  2. If 4 results returned → hasMore = true, pop the extra
  3. nextCursor = last document's _id
  4. Return 3 documents + pagination metadata

Timeline:
  ┌──────────────────────────────────────────┐
  │ Page 1: ?limit=3                         │
  │   Fetch 4 → got 4 → hasMore=true        │
  │   Return 3, nextCursor = doc3._id        │
  ├──────────────────────────────────────────┤
  │ Page 2: ?cursor=doc3._id&limit=3         │
  │   Query: { _id: { $gt: doc3._id } }     │
  │   Fetch 4 → got 2 → hasMore=false       │
  │   Return 2, nextCursor = null            │
  └──────────────────────────────────────────┘
```

**Why cursor over offset?**
- Offset breaks when items are inserted/deleted mid-pagination
- Cursor is stable — always starts from a known position
- Uses the indexed `_id` field — no full collection scans

---

## TypeScript Strictness

### tsconfig.json (both server & client)

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true
  }
}
```

### Enums

```typescript
export enum ProductCategory {
  ELECTRONICS = 'ELECTRONICS',
  CLOTHING = 'CLOTHING',
  BOOKS = 'BOOKS',
  FOOD = 'FOOD'
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}
```

### Constants Objects

```typescript
export const PAGINATION_CONSTANTS = {
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 50
} as const;

export const API_ENDPOINTS = {
  PRODUCTS: '/api/products',
  PRODUCTS_BY_ID: '/api/products/:id',
  PRODUCTS_SEARCH: '/api/products/search'
} as const;
```

### Interfaces

```typescript
export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  stock: number;
  createdAt: Date;
}

export interface IPaginatedResponse<T> {
  data: T[];
  pagination: {
    nextCursor: string | null;
    hasMore: boolean;
  };
  stats?: IPaginationStats;
}

export interface ICursorPaginationRequest {
  cursor?: string;
  limit?: number;
}
```

---

## Security

| Measure | Implementation |
|---------|---------------|
| **CORS** | Configured origin restriction via `CORS_ORIGIN` env variable |
| **Input Validation** | Server validates all request params and payloads before processing |
| **Search Hardening** | Regex special characters escaped to prevent ReDoS attacks |
| **String Sanitization** | Inputs trimmed, whitespace normalized, length-capped |
| **Environment Secrets** | All credentials in `.env` files, never hardcoded, git-ignored |
| **Error Isolation** | No stack traces or internal details exposed in API error responses |
| **Request Timeouts** | 30-second timeout prevents slow/hung requests |
| **Graceful Shutdown** | `SIGTERM`/`SIGINT` handlers close DB connections cleanly |
| **Cursor Validation** | Invalid ObjectId cursors rejected with 400 before hitting the DB |

---

## Database Schema

```javascript
// Product Collection
{
  _id: ObjectId,          // Auto-generated, used as cursor
  name: String,           // Indexed — enables fast search
  description: String,
  price: Number,          // min: 0
  category: String,       // Indexed — enum: ELECTRONICS | CLOTHING | BOOKS | FOOD
  stock: Number,          // min: 0, default: 0
  createdAt: Date         // default: Date.now
}
```

**Indexes:** `name` (search), `category` (filter), `_id` (cursor pagination — default)

---

## Git Workflow

```bash
# Feature branch workflow
git checkout -b feature/project-setup
git commit -m "feat: initialize project structure with TypeScript config"
git push origin feature/project-setup
# → Create Pull Request → Review → Merge to main
```

**Branch conventions used:**
| Branch | Purpose |
|--------|---------|
| `feature/project-setup` | Initial scaffolding, tsconfig, env files |
| `feature/backend-api` | Express server, routes, controllers, services |
| `feature/frontend-ui` | Next.js pages, components, hooks, styles |
| `feature/integration` | End-to-end testing, bug fixes, README |

---

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `MONGODB_URI is strictly required` | Missing `.env.test` or `.env.production` | Create env file from `.env.example` |
| `EADDRINUSE :::5001` | Port already in use | Change `PORT` in `.env.test` or kill the process |
| `CORS policy blocked` | `CORS_ORIGIN` doesn't match client URL | Set `CORS_ORIGIN=http://localhost:3000` in server env |
| `Invalid cursor` | Malformed cursor string in request | Ensure cursor is a valid 24-char MongoDB ObjectId |
| `Network Error` on client | Server not running | Start the server first with `npm run dev` |
| `Cannot find module` | Dependencies not installed | Run `npm install` in both `server/` and `client/` |

---

## Evaluation Checklist

### Code Quality
| Criterion | Status |
|-----------|--------|
| TypeScript strict mode (`tsconfig.json`) | ✅ Both server & client |
| Enums defined (`ProductCategory`, `HttpStatus`, `SortOrder`) | ✅ Server constants |
| Constants objects (`PAGINATION_CONSTANTS`, `API_ENDPOINTS`) | ✅ Both server & client |
| Interfaces defined (`IProduct`, `IPaginatedResponse<T>`, `ICursorPaginationRequest`) | ✅ Both server & client |
| No `any` types used | ✅ Zero occurrences |
| Modular folder structure | ✅ Separated layers |

### Features
| Criterion | Status |
|-----------|--------|
| Cursor-based pagination (not offset) | ✅ MongoDB `_id` cursor, limit+1 strategy |
| SSR on initial page load | ✅ `getServerSideProps` in `index.tsx` |
| Products display correctly | ✅ ProductCard with grid layout |
| Add product form functional | ✅ With validation and feedback |
| Category filter working | ✅ Dropdown with all ProductCategory values |
| Search functionality working | ✅ Debounced, regex-escaped |

### Environment
| Criterion | Status |
|-----------|--------|
| `server/.env.test` exists | ✅ |
| `server/.env.production` exists | ✅ |
| `client/.env.test` exists | ✅ |
| `client/.env.production` exists | ✅ |
| `env.config.ts` validates & exports typed config | ✅ |
| `.env` files in `.gitignore` | ✅ Both root & client |
| `.env.example` provided | ✅ Server, client, and root |

### Documentation
| Criterion | Status |
|-----------|--------|
| README with setup instructions | ✅ |
| How to switch test/production env | ✅ |
| API endpoints documented | ✅ |

---

## Author

**Tejeswar Achari**

- GitHub: [@TejeswarAchari](https://github.com/TejeswarAchari)
- LinkedIn: [Tejeswarachari Vadla](https://linkedin.com/in/tejeswarachari)
- Email: [vteja797@gmail.com](mailto:vteja797@gmail.com)

---

**Repository:** [product-management](https://github.com/TejeswarAchari/product-management)
