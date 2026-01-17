# FarmLokal Backend Assignment

Production-ready backend implementing OAuth2 authentication, external API integrations, and a high-performance product listing API using Nodejs, NestJS, MySQL, Redis, and TypeScript.

---

## 📌 Prerequisites

Make sure you have the following installed:

* **Node.js** v18+
* **MySQL** 8+
* **Redis**
* **npm**
* **Git**

---

## 🔐 Environment Setup

Create a `.env` file in the project root:

```env
# OAuth Configuration
OAUTH_TOKEN_URL=
OAUTH_CLIENT_ID=
OAUTH_CLIENT_SECRET=
OAUTH_AUDIENCE=
OAUTH_GRANT_TYPE=client_credentials

# Database Configuration
DB_HOST=
DB_PORT=3306
DB_NAME=
DB_USER=
DB_PASSWORD=

# Redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

---

## ⚙ Installation

```bash
git clone git@github.com:Abdhesh22/FarmLokal.git
cd server
npm install
```

---

## 🗄 Database Migration

```bash
npx sequelize-cli db:migrate
```

---

## 🌱 Seeder (1 Million Products)

```bash
npx sequelize-cli db:seed:all
```

---

## 🚀 Start Server

```bash
npm run start:dev
```

Server runs on:

```
http://localhost:3000
```

---

## 🔐 OAuth Token Gateway Usage

All external API calls automatically use OAuth2 token via Redis-cached token lifecycle manager.

No manual token handling required.

---

## 🛒 Products API

### Endpoint

```
GET /products
```

### Query Parameters (DTO)

```ts
export class GetProductsQueryDto {
  cursor?: number;       // Cursor based pagination
  limit?: number = 20;   // Max 100
  sort?: 'price' | 'createdAt' | 'name' | 'id';
  order?: 'asc' | 'desc';
  search?: string;       // name / description
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}
```

### Example

```
GET /products?limit=20&category=dairy&sort=price&order=asc&search=milk
```

### Response

```json
{
  "data": [ { ...products } ],
  "nextCursor": 12345
}
```

---

## ⚡ Performance Optimizations

* Cursor based pagination
* MySQL indexes
* Redis caching
* Token caching with distributed lock
* Webhook idempotency
* Exponential retry for external APIs

---

## 🛡 Reliability

* Centralized error handling
* File based error logging
* Redis request deduplication
* Graceful degradation for external APIs

---

## 📊 Logs

Errors are written to:

```
logs/YYYY-MM-DD.log
```

---

## 📦 Tech Stack

* NestJS (TypeScript)
* MySQL
* Redis
* Sequelize
* Auth0 OAuth2
* Faker
* ioredis

---

## 🎯 Submission Focus

> Focused heavily on performance, caching, and reliability to ensure production-grade behavior under scale.

---

## 📝 Author

Abdhesh Kumar