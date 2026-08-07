# ⚙️ Warda — Backend REST API & Real-Time Service

[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-brightgreen.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-v5.2-000000.svg?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248.svg?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Swagger](https://img.shields.io/badge/Swagger-OpenAPI%203.0-85EA2D.svg?logo=swagger&logoColor=black)](http://localhost:5000/api-docs)

The backend service for **Warda (وردة)** — an Express 5 RESTful API and Socket.io server supporting real-time driver tracking, in-app messaging, push notifications, and administrative management.

> 📌 **For full stack documentation, environment details, and architecture overview, please refer to the [Root README](../README.md).**

---

## ⚡ Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Setup Environment**:
   ```bash
   cp .env.example .env
   ```
   Set `MONGO_URI` and a secure `JWT_SECRET` in `.env`.

3. **Seed Database (Optional)**:
   ```bash
   npm run seed
   npm run seed:users
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   * Server URL: `http://localhost:5000`
   * Swagger Documentation: `http://localhost:5000/api-docs`

---

## 🛠️ Key Scripts

- `npm run dev`: Start server with nodemon hot-reload.
- `npm run start`: Run production node server.
- `npm run seed`: Populate products & categories.
- `npm run seed:users`: Populate sample accounts.

---

## 📄 License

Licensed under the [MIT License](../README.md#-license).
