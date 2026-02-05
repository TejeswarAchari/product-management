# 🚀 Product Management System

A modern, full-stack **MERN + Next.js + TypeScript** product catalog application with **Server-Side Rendering (SSR)**, **cursor-based pagination**, and real-time inventory management.

---

## 📊 Tech Stack

![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react)
![Next.js](https://img.shields.io/badge/Next.js-16.1.6-000000?style=for-the-badge&logo=next.js)
![Node.js](https://img.shields.io/badge/Node.js-19.0.0-339933?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-5.2.1-000000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-9.1.6-13AA52?style=for-the-badge&logo=mongodb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript)
![Axios](https://img.shields.io/badge/Axios-1.13.4-5A2D81?style=for-the-badge&logo=axios)
![CSS Modules](https://img.shields.io/badge/CSS_Modules-Styled-06B6D4?style=for-the-badge&logo=css3)

---

## ✨ Features

### Core Features
- ✅ **Server-Side Rendering (SSR)** – Initial product load on server for optimal performance
- ✅ **Cursor-Based Pagination** – Efficient, scalable pagination using MongoDB `_id` cursors
- ✅ **Infinite Scroll / Load More** – Seamless UX with automatic or manual pagination
- ✅ **Product Search** – Real-time search by product name with debouncing
- ✅ **Category Filter** – Browse products by category (Electronics, Clothing, Books, Food)
- ✅ **Add Product** – Create new products with form validation
- ✅ **Inventory Tracking** – Real-time stock status and counts

### Technical Highlights
- 🔒 **Type-Safe** – Full TypeScript implementation with strict mode enabled
- 📦 **Modular Architecture** – Separation of concerns (Controllers → Services → Models)
- 🎯 **Centralized Error Handling** – Express middleware for consistent error responses
- ✅ **Input Validation** – Query and payload validation with safe defaults
- 🧼 **String Sanitization** – Trimmed, length-limited inputs and escaped search regex
- 🔑 **Environment Management** – Separate `.env.test` and `.env.production` configurations
- ⏱️ **Request Timeouts** – Server timeouts to prevent hung requests
- 🧩 **Reusable Components** – React components with CSS Modules
- 🪝 **Custom Hooks** – `useInfiniteProducts` for pagination logic
- 🌐 **CORS Enabled** – Cross-origin requests properly configured

---

## 📋 Project Structure

```
product-management/
├── server/                          # Express.js + MongoDB backend
│   ├── src/
│   │   ├── config/
│   │   │   └── env.config.ts       # Environment validation & loading
│   │   ├── constants/
│   │   │   └── app.constants.ts    # Enums, API endpoints, pagination settings
│   │   ├── types/
│   │   │   ├── product.types.ts    # IProduct interface
│   │   │   └── pagination.types.ts # IPaginatedResponse, ICursorPaginationRequest
│   │   ├── models/
│   │   │   └── Product.model.ts    # Mongoose Product schema
│   │   ├── controllers/
│   │   │   └── product.controller.ts # HTTP request handlers
│   │   ├── services/
│   │   │   └── product.service.ts   # Business logic & database queries
│   │   ├── routes/
│   │   │   └── product.routes.ts    # API endpoint definitions
│   │   ├── middleware/
│   │   │   └── error.middleware.ts  # Centralized error handling
│   │   └── server.ts                # Express app initialization
│   ├── .env.test                    # Development environment variables
│   ├── .env.production              # Production environment variables
│   ├── package.json
│   └── tsconfig.json
│
├── client/                          # Next.js + React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductCard.tsx      # Individual product display
│   │   │   ├── ProductList.tsx      # Product grid with intersection observer
│   │   │   ├── AddProductForm.tsx   # Product creation form
│   │   │   ├── ErrorBoundary.tsx    # React error boundary
│   │   │   └── *.module.css         # Component-scoped styles
│   │   ├── hooks/
│   │   │   └── useInfiniteProducts.ts # Pagination state management
│   │   ├── services/
│   │   │   └── product.service.ts   # API client functions
│   │   ├── types/
│   │   │   └── product.types.ts     # TypeScript interfaces
│   │   ├── constants/
│   │   │   └── app.constants.ts     # Enums & API endpoints
│   │   ├── pages/
│   │   │   ├── _app.tsx             # Next.js App component
│   │   │   ├── _document.tsx        # HTML document structure
│   │   │   └── index.tsx            # Home page with SSR
│   │   └── styles/
│   │       └── *.module.css         # Global & page-specific styles
│   ├── .env.test                    # Development environment variables
│   ├── .env.production              # Production environment variables
│   ├── package.json
│   ├── next.config.ts
│   └── tsconfig.json
│
├── .env.example                     # Configuration template
├── .gitignore                       # Git ignore rules
├── README.md                        # This file
└── package.json                     # Root workspace config
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and **npm** / **yarn**
- **MongoDB** (local or Atlas)
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TejeswarAchari/product-management.git
   cd product-management
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Create environment files** (from `.env.example`)
   ```bash
   # In server/
   cp .env.example .env.test
   cp .env.example .env.production
   
   # In client/
   cp .env.example .env.test
   cp .env.example .env.production
   ```

5. **Edit environment files** with your MongoDB connection strings and API URLs

---

## 🧪 Running in Test Environment

### Start the Backend Server
```bash
cd server
npm run dev
```
The server runs on `http://localhost:5001` (configured in `.env.test`)

**Available endpoints:**
- `GET /api/products?cursor=&limit=10` – Fetch paginated products
- `POST /api/products` – Create new product
- `GET /api/products/search?q=query` – Search products

### Start the Frontend Client
In a new terminal:
```bash
cd client
npm run dev
```
The client runs on `http://localhost:3000`

---

## 🏭 Running in Production Environment

### Build & Run Backend
```bash
cd server
npm run build        # Compile TypeScript
npm run start        # Run compiled server
```

### Build & Run Frontend
```bash
cd client
npm run build        # Next.js production build
npm run start        # Start production server
```

---

## 📖 API Endpoints

### GET /api/products
Fetch paginated products with optional filtering.

**Query Parameters:**
- `cursor` (string, optional) – MongoDB `_id` for pagination
- `limit` (number, optional) – Items per page (default: 10, max: 50)
- `category` (string, optional) – Filter by category

**Example:**
```bash
curl "http://localhost:5001/api/products?limit=10&category=ELECTRONICS"
```

**Response:**
```json
{
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Laptop",
      "description": "High-performance laptop",
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
    "inStock": 40,
    "outOfStock": 10
  }
}
```

### POST /api/products
Create a new product.

**Request Body:**
```json
{
  "name": "Wireless Mouse",
  "description": "Ergonomic wireless mouse",
  "price": 29.99,
  "category": "ELECTRONICS",
  "stock": 100
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "name": "Wireless Mouse",
  "description": "Ergonomic wireless mouse",
  "price": 29.99,
  "category": "ELECTRONICS",
  "stock": 100,
  "createdAt": "2026-02-06T10:30:00.000Z"
}
```

### GET /api/products/search
Search products by name with optional filtering.

**Query Parameters:**
- `q` (string, required) – Search query
- `cursor` (string, optional) – Pagination cursor
- `limit` (number, optional) – Items per page
- `category` (string, optional) – Filter by category

**Example:**
```bash
curl "http://localhost:5001/api/products/search?q=laptop&limit=10"
```

---

## 🔧 Configuring Environments

### `.env.test`
Used during development with local MongoDB:
```dotenv
NODE_ENV=test
PORT=5001
MONGODB_URI=mongodb://localhost:27017/products_test
CORS_ORIGIN=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5001
```

### `.env.production`
Used in production with Atlas or remote MongoDB:
```dotenv
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/products
CORS_ORIGIN=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

**Switching environments:**
- The server automatically loads `.env.test` or `.env.production` based on `NODE_ENV`
- All required variables are validated at startup
- Missing variables throw an error preventing startup

---

## 📐 Architecture & Design Patterns

### Backend Architecture
```
Request → Controller → Service → Model → Database
  ↓         (thin)      (logic)  (schema)
Response
```

- **Controller** – Parses requests, delegates to services
- **Service** – Contains business logic, database queries, reusable functions
- **Model** – Mongoose schema with validations
- **Error Middleware** – Catches all errors and returns consistent responses

### Frontend Architecture
- **Pages** – Next.js pages with SSR support
- **Components** – Reusable React components with CSS Modules
- **Hooks** – Custom `useInfiniteProducts` for state management
- **Services** – Axios-based API client
- **Types** – Full TypeScript interfaces for type safety

### Pagination Strategy
1. **Cursor-Based** – Uses MongoDB `_id` as cursor (globally unique, sortable)
2. **Limit + 1** – Fetches `limit + 1` items to detect if more exist
3. **hasMore Flag** – Indicates if more products are available
4. **nextCursor** – Points to the last item's `_id` for the next fetch
5. **Sorting** – Always by `_id` ascending for consistent ordering

---

## 🛠 Technology Decisions

### Why TypeScript?
- Full type safety from backend to frontend
- Catches errors at compile-time, not runtime
- Improved IDE autocomplete and refactoring
- Better documentation through interfaces

### Why Next.js?
- Built-in SSR for optimal SEO and performance
- File-based routing is simpler than React Router
- API routes could be added for middleware functions
- Automatic code splitting and optimization

### Why Cursor Pagination?
- Scales better than offset-based pagination
- No issues with deletes/inserts mid-pagination
- More efficient database queries (indexed `_id`)
- Better UX for real-time data

### Why CSS Modules?
- Component-scoped styles prevent naming conflicts
- Smaller bundle size than CSS-in-JS
- Better performance than inline styles
- Works seamlessly with Next.js

---

## 📝 Code Quality

### TypeScript Strict Mode
All files use TypeScript strict mode:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### No `any` Types
All variables and function parameters have explicit types.

### Enums & Constants
```typescript
export enum ProductCategory {
  ELECTRONICS = 'ELECTRONICS',
  CLOTHING = 'CLOTHING',
  BOOKS = 'BOOKS',
  FOOD = 'FOOD'
}

export const PAGINATION_CONSTANTS = {
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 50
} as const;
```

### Error Handling
Centralized error middleware:
```typescript
export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const status = err.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
  res.status(status).json({ message: err.message });
};
```

---

## 🧪 Testing

Unit tests can be added using **Jest** and **React Testing Library**.

Example test (not included but recommended):
```typescript
describe('useInfiniteProducts', () => {
  it('should load more products on loadMore call', async () => {
    // Test implementation
  });
});
```

---

## 📊 Database Schema

### Product Collection
```javascript
{
  _id: ObjectId,
  name: String (indexed),
  description: String,
  price: Number,
  category: Enum (indexed),
  stock: Number,
  createdAt: Date (default: now)
}
```

**Indexes:**
- `name` – For search performance
- `category` – For filtering
- `_id` – Default (used for cursor pagination)

---

## 🔐 Security Considerations

- ✅ **CORS** – Configured to allow only specified origins
- ✅ **Environment Variables** – Secrets never hardcoded
- ✅ **Input Validation** – Category, limit, and payload validation
- ✅ **Search Hardening** – Escaped regex to prevent ReDoS
- ✅ **Error Messages** – No stack traces exposed in production
- ✅ **Request Timeouts** – Prevents slow-hanging requests
- ⚠️ **TODO** – Add rate limiting and auth middleware

---

## 📚 Git Workflow

Feature branches and Pull Requests follow a standard workflow:

```bash
# Create feature branch
git checkout -b feature/project-setup

# Make changes and commit
git commit -m "feat: add project structure"

# Push and create PR
git push origin feature/project-setup
```

**Branch naming convention:**
- `feature/project-setup` – Initial setup
- `feature/backend-api` – Backend implementation
- `feature/frontend-ui` – Frontend implementation
- `feature/integration` – Integration and testing

---

## 🎯 Evaluation Criteria Met

| Criterion | Status | Notes |
|-----------|--------|-------|
| **Git Workflow** | ✅ | 4+ feature branches, PRs all merged to main |
| **TypeScript** | ✅ | Strict mode, enums, constants, interfaces |
| **Cursor Pagination** | ✅ | MongoDB `_id` cursor, limit+1 strategy |
| **SSR** | ✅ | Next.js `getServerSideProps` implementation |
| **Modularity** | ✅ | Controller-Service-Model separation |
| **Error Handling** | ✅ | Centralized middleware |
| **Environment Config** | ✅ | Validated, loads by NODE_ENV |
| **Feature Completeness** | ✅ | Listing, search, filter, add, pagination |
| **Code Quality** | ✅ | No `any` types, reusable components |
| **Documentation** | ✅ | This README with setup, API docs, architecture |

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: MONGODB_URI is strictly required
```
**Solution:** Ensure `.env.test` or `.env.production` has correct `MONGODB_URI`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5001
```
**Solution:** Change PORT in `.env.test` or kill the process using the port

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** Ensure CORS_ORIGIN in server `.env` matches client's `NEXT_PUBLIC_API_URL`

### Invalid Cursor Error
```
Error: Invalid cursor
```
**Solution:** Ensure cursor is a valid MongoDB ObjectId string

---

## 📞 Support & Contact

For questions or issues, please reach out:

### 👨‍💻 Author
**Tejeswar Achari**

- **GitHub:** [@TejeswarAchari](https://github.com/TejeswarAchari)
- **LinkedIn:** [Tejeswarachari Vadla](https://linkedin.com/in/tejeswarachari)
- **Email:** [vteja797@gmail.com](mailto:vteja797@gmail.com)

---

## 📄 License

This project is provided as-is for educational and internship evaluation purposes.

---

## 🙏 Acknowledgments

Built with ❤️ by **Tejeswar Achari** as part of the MERN Stack Internship Assignment.

Special thanks to:
- The open-source community for excellent libraries like Express, Mongoose, Next.js, and React
- Best practices from industry standards and architectural patterns

---

**Last Updated:** February 6, 2026  
**Repository:** [product-management](https://github.com/TejeswarAchari/product-management)
