# 🛍️ Product Management System

A full-stack product management application with infinite scroll functionality, built with Next.js, Express.js, and MongoDB.
---
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat&logo=mongoose&logoColor=white)
---

## 📸 Application Screenshots

### Hero Section & Overview
![Application Overview](./client/public/readme-herosSection-overview.png)

### Product Display
![Product Display](./client/public/readme-show-products.png)

### Add Product Form
![Add Product Form](./client/public/readme-form-section.png)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [How Infinite Scroll Works](#-how-infinite-scroll-works)
- [Data Flow](#-data-flow)
- [Setup Instructions](#-setup-instructions)

---

## 🎯 Overview

This is a modern product management system that allows users to:
- ✨ View products with infinite scroll
- 🔍 Search products by name
- 🏷️ Filter products by category
- ➕ Add new products with validation
- 📊 View inventory statistics
- 📱 Responsive design that works on all devices

---

## 🛠️ Tech Stack

### Frontend
- **Next.js** - React framework with Server-Side Rendering
- **React** - UI library
- **TypeScript** - Type safety throughout the application
- **CSS Modules** - Scoped component styling
- **Axios** - HTTP client for API calls

### Backend
- **Express.js** - Web framework for Node.js
- **TypeScript** - Type-safe backend development
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Key Technologies
- **Cursor-Based Pagination** - Efficient infinite scroll
- **Server-Side Rendering** - Fast initial page load
- **Error Boundaries** - Graceful error handling
- **Input Validation** - Both client and server-side

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📜 **Infinite Scroll** | Automatically loads more products as you scroll |
| 🔍 **Real-Time Search** | Debounced search by product name |
| 🏷️ **Category Filter** | Filter by Electronics, Clothing, Books, Food |
| ➕ **Add Products** | Create new products with validation |
| 📊 **Inventory Dashboard** | Live stats for total, in-stock, and out-of-stock items |
| 🎨 **Responsive UI** | Works seamlessly on desktop, tablet, and mobile |
| ⚡ **Fast Loading** | Server-side rendering with optimized pagination |
| 🛡️ **Error Handling** | Graceful error boundaries and user feedback |
| 🔒 **Type Safety** | Full TypeScript implementation (strict mode) |

---

## 🏗️ Architecture

### System Architecture

```mermaid
graph TB
    subgraph "Client Layer - Next.js"
        A[Browser]
        B[Pages Router]
        C[React Components]
        D[Custom Hooks]
        E[API Services]
    end
    
    subgraph "Server Layer - Express.js"
        F[REST API Routes]
        G[Controllers]
        H[Business Services]
        I[Data Models]
    end
    
    subgraph "Data Layer"
        J[(MongoDB Database)]
    end
    
    A --> B
    B --> C
    C --> D
    D --> E
    E -->|HTTP/HTTPS| F
    F --> G
    G --> H
    H --> I
    I --> J
    
    style A fill:#61dafb
    style F fill:#68a063
    style J fill:#4db33d
```

### Architecture Layers

**Client Layer (Next.js + React)**
- **Pages**: Handle routing and Server-Side Rendering
- **Components**: Reusable UI elements (ProductCard, ProductList, AddProductForm)
- **Custom Hooks**: Data fetching and state management (useInfiniteProducts)
- **Services**: API communication with the backend

**Server Layer (Express.js)**
- **Routes**: Define API endpoints
- **Controllers**: Handle HTTP requests and responses
- **Services**: Implement business logic and data operations
- **Models**: Define database schemas and validation

**Data Layer (MongoDB)**
- **Database**: Store and manage product data
- **Indexes**: Optimize search and filtering operations

---

## 📁 Project Structure

```
product-management/
│
├── client/                          # Frontend Application (Next.js)
│   ├── src/
│   │   ├── pages/                  # Next.js Pages & Routing
│   │   │   ├── index.tsx           # Home page (SSR)
│   │   │   ├── _app.tsx            # App wrapper with ErrorBoundary
│   │   │   ├── _document.tsx       # HTML document structure
│   │   │   └── 404.tsx             # Custom 404 page
│   │   │
│   │   ├── components/             # React Components
│   │   │   ├── ProductCard.tsx     # Individual product card
│   │   │   ├── ProductList.tsx     # Product grid with infinite scroll
│   │   │   ├── AddProductForm.tsx  # Form to add new products
│   │   │   ├── ErrorBoundary.tsx   # Error handling component
│   │   │   └── *.module.css        # Component-specific styles
│   │   │
│   │   ├── hooks/                  # Custom React Hooks
│   │   │   └── useInfiniteProducts.ts  # Infinite scroll logic
│   │   │
│   │   ├── services/               # API Communication Layer
│   │   │   └── product.service.ts  # Product API calls
│   │   │
│   │   ├── types/                  # TypeScript Type Definitions
│   │   │   └── product.types.ts    # Product interfaces
│   │   │
│   │   ├── constants/              # Application Constants
│   │   │   └── app.constants.ts    # Configuration values
│   │   │
│   │   └── styles/                 # Global Styles
│   │       ├── globals.css         # Global CSS variables & styles
│   │       ├── Home.module.css     # Home page styles
│   │       └── NotFound.module.css # 404 page styles
│   │
│   ├── public/                     # Static Assets
│   │   ├── readme-*.png            # Documentation images
│   │   └── *.svg                   # Icon files
│   │
│   ├── .env.test                   # Development environment variables
│   ├── .env.production             # Production environment variables
│   ├── .env.example                # Environment template
│   ├── next.config.ts              # Next.js configuration
│   ├── tsconfig.json               # TypeScript configuration
│   └── package.json                # Dependencies & scripts
│
├── server/                          # Backend Application (Express.js)
│   ├── src/
│   │   ├── server.ts               # Application entry point
│   │   │
│   │   ├── config/                 # Configuration Files
│   │   │   └── env.config.ts       # Environment validation
│   │   │
│   │   ├── routes/                 # API Routes
│   │   │   └── product.routes.ts   # Product endpoints
│   │   │
│   │   ├── controllers/            # Request Handlers
│   │   │   └── product.controller.ts  # Product controller
│   │   │
│   │   ├── services/               # Business Logic
│   │   │   └── product.service.ts  # Product operations
│   │   │
│   │   ├── models/                 # Database Models
│   │   │   └── Product.model.ts    # Product schema
│   │   │
│   │   ├── middleware/             # Express Middleware
│   │   │   └── error.middleware.ts # Error handling
│   │   │
│   │   ├── types/                  # TypeScript Types
│   │   │   ├── product.types.ts    # Product types
│   │   │   └── pagination.types.ts # Pagination types
│   │   │
│   │   ├── utils/                  # Helper Functions
│   │   │   └── validation.ts       # Input validation
│   │   │
│   │   └── constants/              # Application Constants
│   │       └── app.constants.ts    # Enums & constants
│   │
│   ├── .env.test                   # Development environment variables
│   ├── .env.production             # Production environment variables
│   ├── .env.example                # Environment template
│   ├── tsconfig.json               # TypeScript configuration
│   └── package.json                # Dependencies & scripts
│
├── .gitignore                       # Git ignore rules
└── README.md                        # This file
```

---

## ♾️ How Infinite Scroll Works

### Concept Overview

Infinite scroll progressively loads products as the user scrolls down, instead of loading everything at once. This application uses **cursor-based pagination** for optimal performance and data consistency.

### Why Cursor-Based Pagination?

**Traditional Offset Pagination Issues:**
- Breaks when items are added/deleted during scrolling
- Causes duplicate or skipped items
- Performance degrades with deep pagination

**Cursor-Based Solution:**
- Uses MongoDB document ID as stable reference point
- Always starts from known position
- Consistent results even with data changes
- Efficient database queries using indexed fields

### Infinite Scroll Sequence Flow

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Hook as useInfiniteProducts
    participant Service as ProductService
    participant API as Express API
    participant DB as MongoDB

    User->>Browser: Opens Application
    Browser->>Hook: Component Mounts
    Hook->>Service: fetchProducts(cursor=null, limit=10)
    Service->>API: GET /api/products?limit=10
    API->>DB: Find first 10 products
    DB-->>API: Return products + hasMore flag
    API-->>Service: {data, pagination, stats}
    Service-->>Hook: Update products state
    Hook-->>Browser: Render Products
    Browser-->>User: Display Products

    Note over User,Browser: User Scrolls Down

    Browser->>Hook: Scroll Event (80% threshold)
    Hook->>Hook: Check: loading? hasMore?
    Hook->>Service: fetchProducts(cursor=lastId, limit=10)
    Service->>API: GET /api/products?cursor=abc123&limit=10
    API->>DB: Find next 10 products after cursor
    DB-->>API: Return products + hasMore flag
    API-->>Service: {data, pagination, stats}
    Service-->>Hook: Append to products array
    Hook-->>Browser: Render More Products
    Browser-->>User: Display Additional Products

    Note over User,Browser: Process Repeats Until No More Data
```

### Cursor Pagination Mechanism

```mermaid
graph LR
    A[Page 1<br/>cursor: null<br/>Products 1-10] --> B[Page 2<br/>cursor: id_10<br/>Products 11-20]
    B --> C[Page 3<br/>cursor: id_20<br/>Products 21-30]
    C --> D[Page 4<br/>cursor: id_30<br/>Products 31-40]
    D --> E[...]
    
    style A fill:#4CAF50,color:#fff
    style B fill:#66BB6A,color:#fff
    style C fill:#81C784,color:#fff
    style D fill:#A5D6A7,color:#fff
```

### Scroll Detection Logic

```mermaid
flowchart TD
    A[User Scrolls Page] --> B{Scrolled Near<br/>Bottom 80%?}
    B -->|No| C[Continue Monitoring]
    B -->|Yes| D{Already Loading<br/>Data?}
    D -->|Yes| C
    D -->|No| E{Has More<br/>Data Available?}
    E -->|No| F[Show End of List Message]
    E -->|Yes| G[Increment Page & Fetch]
    G --> H[Send API Request<br/>with Cursor]
    H --> I[Receive New Products]
    I --> J[Append to Existing List]
    J --> K[Update UI]
    K --> C
    
    style A fill:#2196F3,color:#fff
    style G fill:#4CAF50,color:#fff
    style H fill:#FF9800,color:#fff
    style J fill:#9C27B0,color:#fff
```

### How the Backend Handles Cursors

```mermaid
flowchart TD
    A[API Request Received] --> B{Has Cursor<br/>Parameter?}
    B -->|No| C[Query: Find First 10 Items]
    B -->|Yes| D[Query: Find 10 Items After Cursor]
    C --> E[Fetch Limit + 1 Items]
    D --> E
    E --> F{Got More Than<br/>Limit Items?}
    F -->|Yes| G[hasMore = true]
    F -->|No| H[hasMore = false]
    G --> I[Return Limit Items]
    H --> J[Return All Items]
    I --> K[Set nextCursor = Last Item ID]
    J --> L[Set nextCursor = null]
    K --> M[Send Response]
    L --> M
    
    style A fill:#FF6B6B,color:#fff
    style E fill:#4ECDC4,color:#fff
    style M fill:#95E1D3,color:#fff
```

---

## 🔄 Data Flow

### Complete Application Data Flow

```mermaid
graph TD
    subgraph "User Actions"
        A1[View Products]
        A2[Scroll Down]
        A3[Search Products]
        A4[Filter by Category]
        A5[Add New Product]
    end
    
    subgraph "Frontend Layer"
        B1[Next.js Pages]
        B2[React Components]
        B3[useInfiniteProducts Hook]
        B4[ProductService API]
    end
    
    subgraph "HTTP Layer"
        C1[GET /api/products]
        C2[GET /api/products/search]
        C3[POST /api/products]
    end
    
    subgraph "Backend Layer"
        D1[Product Controller]
        D2[Input Validation]
        D3[Product Service]
        D4[Product Model]
    end
    
    subgraph "Database"
        E1[(MongoDB)]
    end
    
    A1 --> B1
    A2 --> B2
    A3 --> B2
    A4 --> B2
    A5 --> B2
    B1 --> B3
    B2 --> B3
    B3 --> B4
    B4 --> C1
    B4 --> C2
    B4 --> C3
    C1 --> D1
    C2 --> D1
    C3 --> D1
    D1 --> D2
    D2 --> D3
    D3 --> D4
    D4 --> E1
    E1 --> D4
    D4 --> D3
    D3 --> D1
    D1 --> B4
    B4 --> B3
    B3 --> B2
    B2 --> A1
    
    style A1 fill:#FF6B6B,color:#fff
    style A5 fill:#4ECDC4,color:#fff
    style B3 fill:#45B7D1,color:#fff
    style D1 fill:#96CEB4,color:#fff
    style E1 fill:#FFEAA7,color:#000
```

### Adding a Product - Detailed Flow

```mermaid
sequenceDiagram
    participant User
    participant Form as AddProductForm
    participant Service as ProductService
    participant API as Express API
    participant Validation as Validator
    participant DB as MongoDB
    participant List as ProductList

    User->>Form: Enter Product Details
    User->>Form: Click Submit Button
    Form->>Form: Client-Side Validation
    
    alt Validation Fails
        Form-->>User: Show Error Message
    else Validation Passes
        Form->>Service: addProduct(productData)
        Service->>API: POST /api/products
        API->>Validation: Validate Input
        
        alt Server Validation Fails
            Validation-->>API: Validation Error
            API-->>Service: 400 Bad Request
            Service-->>Form: Error Response
            Form-->>User: Show Error Message
        else Server Validation Passes
            Validation-->>API: Valid Data
            API->>DB: Insert New Product
            DB-->>API: Product Created
            API-->>Service: 201 Created
            Service-->>Form: Success Response
            Form->>Form: Reset Form
            Form->>List: Trigger Refresh
            List->>Service: fetchProducts()
            Service->>API: GET /api/products
            API->>DB: Query Products
            DB-->>API: Return Products
            API-->>Service: Product List
            Service-->>List: Update State
            List-->>User: Display Updated Products
            Form-->>User: Show Success Message
        end
    end
```

### Search and Filter Flow

```mermaid
flowchart TD
    A[User Types in Search] --> B[Debounce Input<br/>500ms delay]
    B --> C{Search Query<br/>Length > 0?}
    C -->|No| D[Show All Products]
    C -->|Yes| E[Send Search Request]
    
    F[User Selects Category] --> G{Category Filter<br/>Selected?}
    G -->|All Categories| D
    G -->|Specific Category| H[Apply Category Filter]
    
    E --> I[API: GET /products/search]
    H --> J[API: GET /products?category=X]
    D --> K[API: GET /products]
    
    I --> L[Database Query<br/>with Search Regex]
    J --> M[Database Query<br/>with Category Filter]
    K --> N[Database Query<br/>All Products]
    
    L --> O[Return Filtered Results]
    M --> O
    N --> O
    
    O --> P[Update UI with Results]
    P --> Q[Display Products]
    
    style A fill:#3498db,color:#fff
    style E fill:#e74c3c,color:#fff
    style F fill:#f39c12,color:#fff
    style O fill:#2ecc71,color:#fff
```

### Server-Side Rendering (SSR) Flow

```mermaid
sequenceDiagram
    participant Browser
    participant NextJS as Next.js Server
    participant SSR as getServerSideProps
    participant API as Express API
    participant DB as MongoDB

    Browser->>NextJS: Request Page (/)
    NextJS->>SSR: Execute on Server
    SSR->>API: GET /api/products?limit=10
    API->>DB: Query First Page
    DB-->>API: Return Products
    API-->>SSR: Products Data
    SSR->>NextJS: Return Props
    NextJS->>NextJS: Render HTML on Server
    NextJS-->>Browser: Send Fully Rendered HTML
    Browser->>Browser: Display Instant Content
    Browser->>Browser: Hydrate React
    
    Note over Browser,NextJS: Fast Initial Load - No Loading Spinner
```

---

## 🚀 Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed on your system:

| Software | Version | Download Link |
|----------|---------|---------------|
| **Node.js** | 18 or higher | [https://nodejs.org/](https://nodejs.org/) |
| **npm** | 9 or higher | Comes with Node.js |
| **MongoDB** | 6 or higher | [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community) |
| **Git** | Latest | [https://git-scm.com/downloads](https://git-scm.com/downloads) |

### Step 1: Clone the Repository

Open your terminal and run:

**Using HTTPS:**
```
git clone https://github.com/TejeswarAchari/product-management.git
cd product-management
```

**Using SSH:**
```
git clone git@github.com:TejeswarAchari/product-management.git
cd product-management
```

### Step 2: Setup MongoDB

You have two options for MongoDB:

**Option A: Local MongoDB**

1. Install MongoDB Community Edition from the link above
2. Start MongoDB service:
   - **Windows:** MongoDB starts automatically as a service
   - **macOS:** `brew services start mongodb-community`
   - **Linux:** `sudo systemctl start mongod`
3. MongoDB will be available at: `mongodb://localhost:27017`

**Option B: MongoDB Atlas (Cloud - Recommended)**

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Click "Connect" and choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password

### Step 3: Install Dependencies

**Install Server Dependencies:**
```
cd server
npm install
```

**Install Client Dependencies:**
```
cd ../client
npm install
```

### Step 4: Configure Environment Variables

**For the Server:**

Navigate to the server directory and create environment files:

```
cd server
```

Create `.env.test` file for development:
```
NODE_ENV=test
PORT=5001
MONGODB_URI=mongodb://localhost:27017/products_test
CORS_ORIGIN=http://localhost:3000
```

Create `.env.production` file for production:
```
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
CORS_ORIGIN=https://yourdomain.com
```

**For the Client:**

Navigate to the client directory and create environment files:

```
cd ../client
```

Create `.env.test` file for development:
```
NEXT_PUBLIC_API_URL=http://localhost:5001
```

Create `.env.production` file for production:
```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### Step 5: Start the Development Servers

You'll need **two terminal windows** open.

**Terminal 1 - Start the Backend Server:**

```
cd server
npm run dev
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:5001
```

**Terminal 2 - Start the Frontend:**

```
cd client
npm run dev
```

You should see:
```
ready - started server on 0.0.0.0:3000
```

### Step 6: Access the Application

Open your web browser and navigate to:

```
http://localhost:3000
```

You should see the Product Management interface!

### Verification Checklist

✅ **Backend Running**: Visit `http://localhost:5001/api/products` - should return JSON response  
✅ **Frontend Running**: Visit `http://localhost:3000` - should display the product interface  
✅ **Database Connected**: Check server terminal for "Connected to MongoDB" message  
✅ **Add Product**: Try adding a product through the form  
✅ **Infinite Scroll**: Scroll down to load more products  
✅ **Search**: Use the search bar to filter products  
✅ **Category Filter**: Select a category from the dropdown

### Environment Switching

The application automatically loads the correct environment:

- **Development**: Uses `.env.test` files (default when running `npm run dev`)
- **Production**: Uses `.env.production` files (when running `npm start`)

### Troubleshooting

| Problem | Solution |
|---------|----------|
| **Port already in use** | Change `PORT` in server `.env.test` or stop the process using that port |
| **Cannot connect to MongoDB** | Ensure MongoDB service is running or check your connection string |
| **CORS errors** | Verify `CORS_ORIGIN` in server env matches client URL |
| **Module not found errors** | Run `npm install` in both server and client directories |
| **Page not loading** | Ensure both backend (5001) and frontend (3000) servers are running |
| **Network Error** | Backend might not be running - check Terminal 1 |

### Production Build

**Build the Backend:**
```
cd server
npm run build
npm start
```

**Build the Frontend:**
```
cd client
npm run build
npm start
```

---

## 📊 Application Features in Detail

### Inventory Dashboard
- **Total Products**: Real-time count of all products
- **In Stock**: Products with stock > 0
- **Out of Stock**: Products with stock = 0

### Product Categories
- Electronics
- Clothing
- Books
- Food

### Validation Rules
- **Product Name**: Required, max 120 characters
- **Description**: Required, max 2000 characters
- **Price**: Required, must be ≥ 0
- **Stock**: Required, must be ≥ 0
- **Category**: Required, must be valid category

---

## 🎨 Application Flow Summary

1. **Initial Load**: Next.js server renders the first page with initial products (SSR)
2. **Display**: Products are shown in a responsive grid layout
3. **Scroll Detection**: Application monitors scroll position (triggers at 80% threshold)
4. **Load More**: Fetches next page using cursor-based pagination
5. **Append**: New products are added to the existing list seamlessly
6. **Search/Filter**: Real-time filtering with debounced search
7. **Add Product**: Form validation on both client and server
8. **Refresh**: Product list updates automatically after adding new product

---

## 🔒 Security Features

- **CORS Protection**: Configured origin restrictions
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Protection**: MongoDB parameterized queries
- **XSS Prevention**: Input sanitization and escaping
- **Environment Security**: Credentials stored in .env files (git-ignored)
- **Error Handling**: No sensitive data exposed in error messages
- **Request Timeouts**: 30-second timeout to prevent hung requests

---

## 📞 Support & Contact

If you encounter any issues during setup or have questions:

- **GitHub Issues**: [Create an issue](https://github.com/TejeswarAchari/product-management/issues)
- **Email**: [vteja797@gmail.com](mailto:vteja797@gmail.com)
- **LinkedIn**: [Tejeswarachari Vadla](https://linkedin.com/in/tejeswarachari)

---

## 👨‍💻 Author

**Tejeswar Achari**

- GitHub: [@TejeswarAchari](https://github.com/TejeswarAchari)
- LinkedIn: [Tejeswarachari Vadla](https://linkedin.com/in/tejeswarachari)
- Email: [vteja797@gmail.com](mailto:vteja797@gmail.com)

---

## 📝 License

This project is open source and available for educational purposes.

---

**Happy Coding! 🚀**
