# FarmLokal Backend Assignment

Production-ready backend implementing OAuth2 authentication, external API integrations, and a high-performance product listing API using **Node.js, NestJS, MySQL, Redis, and TypeScript**.

---

## 📌 Prerequisites

Make sure you have the following installed:

* **Node.js** v18+
* **MySQL** 8+
* **Redis**
* **npm**
* **Git**

---

## ⚙ Installation

```bash
git clone git@github.com:Abdhesh22/FarmLokal.git
cd FarmLokal/server
npm install
```

---

## 🔐 Environment Setup

Create a `.env` file inside the `server` folder:

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

### Query Parameters

| Param    | Type   | Description                           |
| -------- | ------ | ------------------------------------- |
| cursor   | number | Cursor for pagination                 |
| limit    | number | Page size (default 20, max 100)       |
| sort     | string | `price` | `createdAt` | `name` | `id` |
| order    | string | `asc` | `desc`                        |
| search   | string | Search by name or description         |
| category | string | Filter by category                    |
| minPrice | number | Minimum price                         |
| maxPrice | number | Maximum price                         |

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

**Abdhesh Kumar**