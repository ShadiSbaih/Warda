# 🌹 Warda — On-Demand Gifts & Flowers Delivery Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/Node.js-v18%2B-brightgreen.svg)](https://nodejs.org/)
[![Expo SDK](https://img.shields.io/badge/Expo-v54.0-000000.svg?logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB.svg?logo=react&logoColor=black)](https://reactnative.dev/)
[![Express.js](https://img.shields.io/badge/Express-v5.2-000000.svg?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248.svg?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-WebSockets-010101.svg?logo=socketdotio&logoColor=white)](https://socket.io/)

**Warda (وردة)** is an enterprise-ready, end-to-end digital commerce solution designed for ordering and delivering luxury floral arrangements, personalized gift boxes, chocolates, and celebration essentials. The platform pairs a cross-platform React Native / Expo mobile app with an Express REST API backend powering real-time courier tracking, automated occasion scheduling, custom gift personalization, and interactive customer support.

---

## 📑 Table of Contents

- [Architectural Overview](#-architectural-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Project Repository Structure](#-project-repository-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Backend Setup](#1-backend-setup)
  - [2. Mobile Application Setup](#2-mobile-application-setup)
- [Environment Configuration](#-environment-configuration)
- [API Documentation & Standards](#-api-documentation--standards)
- [Real-Time WebSockets Architecture](#-real-time-websockets-architecture)
- [Security & Production Hardening](#-security--production-hardening)
- [Available CLI Scripts](#-available-cli-scripts)
- [License](#-license)

---

## 🏗️ Architectural Overview

```
                        ┌─────────────────────────────────────────┐
                        │             Mobile Client               │
                        │   Expo / React Native (iOS, Android)    │
                        └────────────────────┬────────────────────┘
                                             │
                                    HTTP / REST & WebSockets
                                             │
                        ┌────────────────────▼────────────────────┐
                        │             Backend Server              │
                        │    Node.js + Express + Socket.io        │
                        └─────────┬───────────────────┬───────────┘
                                  │                   │
                     ┌────────────▼──────────┐     ┌──▼────────────────────┐
                     │   MongoDB Database    │     │ External Integrations │
                     │  Mongoose ODM Schemas │     │ Firebase, SMTP, Maps  │
                     └───────────────────────┘     └───────────────────────┘
```

The system is structured as a modular full-stack repository:
* **Mobile Client (`/mobile-app`)**: High-performance mobile UI built with Expo SDK 54, React Native 0.81, and TypeScript using Expo Router's file-based navigation.
* **Core API Service (`/backend`)**: Express 5 application offering secure REST API endpoints, MongoDB persistence layer via Mongoose, and Socket.io for live order tracking and customer support chats.

---

## 🌟 Key Features

### 📱 Mobile Experience
- 🌸 **Curated Catalogue**: Explore premium flower bouquets, hand-crafted chocolates, and curated gift hampers categorized by event.
- 💌 **Custom Gift Greeting Cards**: Attach personalized greetings with dynamic card themes and typography styling.
- 🎨 **Packaging Customization**: Select custom wrapping colors, ribbons, and attach personal photo prints.
- 🕵️ **Anonymous Gifting**: Send gifts with complete anonymity options for surprise deliveries.
- 📅 **Scheduled Delivery**: Book specific delivery slots for birthdays, anniversaries, and holidays.
- 🔔 **Occasion Calendar Reminders**: Automated local/push notifications reminding users of upcoming anniversaries and birthdays.
- 📍 **Real-Time Order Tracking**: Live driver map tracking powered by Socket.io and React Native Maps.
- 💬 **Live Customer Care Chat**: In-app real-time support chat.
- 🛍️ **Cart & Coupon Engine**: Seamless checkouts supporting promotional discounts and saved addresses.

### ⚙️ Backend Services & Administration
- 🔐 **Stateless Authentication**: JWT-based user authentication with bcrypt password hashing and OTP-based verification.
- 🛑 **Rate Limiting & Security**: Protection against DDoS and injection via `express-rate-limit`, `helmet`, `hpp`, and `express-mongo-sanitize`.
- 📊 **Analytics Engine**: Real-time sales metrics, revenue analytics, and popular product statistics.
- 📖 **Interactive OpenAPI/Swagger Docs**: Fully documented REST API endpoints served via Swagger UI at `/api-docs`.
- 📦 **Database Seeding Utility**: Pre-configured scripts to quickly populate mock inventory, categories, and test user roles.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Mobile Client** | React Native 0.81, Expo SDK 54, Expo Router, React 19, TypeScript |
| **Mobile UI & Assets** | Expo Vector Icons, Expo Linear Gradient, Expo Blur, Reanimated 4, React Hook Form, Zod |
| **Mobile Services** | Socket.io Client, React Native Maps, Expo Location, Expo Notifications, Expo Image Picker |
| **Backend Core** | Node.js (v18+), Express 5.2, Socket.io 4.8 |
| **Database & ODM** | MongoDB, Mongoose 9.7 |
| **Security & Middleware**| Helmet, Express Rate Limit, Mongo Sanitize, HPP, CORS, JWT |
| **API Documentation** | Swagger JSDoc, Swagger UI Express |
| **Logging & Monitoring**| Winston, Morgan HTTP Logger |
| **Storage & Notifications**| Firebase Admin SDK, Nodemailer, Multer |

---

## 📁 Project Repository Structure

```
Ward/
├── backend/                  # Express REST & WebSocket Server
│   ├── config/               # Database, Swagger, and Logger configurations
│   ├── controllers/          # Business logic handlers
│   ├── middleware/           # Auth, validation, rate limiting, error handlers
│   ├── models/               # Mongoose database schemas
│   ├── routes/               # Modular Express router modules
│   ├── services/             # External service wrappers (SMS, Mail, Push)
│   ├── socket/               # Socket.io event handlers & real-time namespaces
│   ├── uploads/              # Static media uploads directory
│   ├── utils/                # Utility helpers & validators
│   ├── .env.example          # Sample backend environment configuration
│   ├── seedData.js           # Initial products/categories populator
│   ├── seedUsers.js          # Default administrative & sample user generator
│   └── server.js             # Application entry point
│
└── mobile-app/               # Cross-Platform React Native Expo Application
    ├── app/                  # Expo Router file-based screens and navigation tabs
    ├── assets/               # Branding assets, fonts, icons, splash screens
    ├── components/           # Reusable UI component library
    ├── constants/            # Design system tokens, color palettes, API endpoints
    ├── context/              # Global React Context providers (Auth, Cart, Socket)
    ├── hooks/                # Custom React hooks
    ├── services/             # API HTTP client & Socket service modules
    ├── scripts/              # Utility scripts
    ├── .env.example          # Sample mobile app environment configuration
    ├── app.json              # Expo manifest & standalone app configuration
    └── tsconfig.json         # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure the following tools are installed on your machine:
* **Node.js**: `v18.0.0` or higher
* **npm**: `v9.0.0` or higher
* **MongoDB**: Local MongoDB instance (`mongodb://localhost:27017`) or a MongoDB Atlas connection URI.
* **Expo Go / Emulator**: Expo Go app on iOS/Android or an configured Android Studio Emulator / Xcode Simulator.

---

### 1. Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install node dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
   *Edit `.env` and configure `MONGO_URI` and a secure `JWT_SECRET` (minimum 32 characters).*

4. **Seed Database (Optional)**:
   Populate initial store categories, products, and test accounts:
   ```bash
   npm run seed
   npm run seed:users
   ```

5. **Start Development Server**:
   ```bash
   npm run dev
   ```
   The backend API will start on `http://localhost:5000`.  
   Interactive API documentation will be available at `http://localhost:5000/api-docs`.

---

### 2. Mobile Application Setup

1. **Navigate to the mobile app directory**:
   ```bash
   cd mobile-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Update `EXPO_PUBLIC_API_URL` to point to your backend service IP (e.g., `http://190.168.x.x:5000/api` for local device testing or `http://localhost:5000/api` for web/emulator).

4. **Launch Application**:
   ```bash
   # Start Expo dev server
   npm run start

   # Or run target platforms directly
   npm run android  # Run on Android Emulator
   npm run ios      # Run on iOS Simulator
   npm run web      # Run on Web Browser
   ```

---

## ⚙️ Environment Configuration

### Backend (`backend/.env`)

| Variable | Description | Default / Example |
|---|---|---|
| `PORT` | HTTP Port for Express Server | `5000` |
| `NODE_ENV` | Environment stage (`development` \| `production`) | `development` |
| `MONGO_URI` | MongoDB Connection string | `mongodb://localhost:27017/warda_gifts` |
| `JWT_SECRET` | Secret key for signing JSON Web Tokens | *(Min 32 random characters)* |
| `JWT_EXPIRES_IN` | JWT token validity window | `7d` |
| `CORS_ORIGIN` | Allowed client origins | `http://localhost:8081,http://localhost:19006` |
| `UPLOAD_MAX_FILE_MB` | Max upload size in megabytes | `5` |

### Mobile (`mobile-app/.env`)

| Variable | Description | Example |
|---|---|---|
| `EXPO_PUBLIC_API_URL` | Base HTTP endpoint for REST backend | `http://localhost:5000/api` |
| `EXPO_PUBLIC_MAPS_API_KEY` | Key for Google Maps / Mapbox services | `AIzaSy...` |

---

## 📖 API Documentation & Standards

Warda follows RESTful routing standards. All API responses return standardized JSON payloads:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

### Main API Endpoints Summary

| Endpoint Group | Base Path | Key Capabilities |
|---|---|---|
| **Auth & Verification** | `/api/auth`, `/api/otp` | User signup, login, OTP verification, password reset |
| **Catalog** | `/api/products`, `/api/categories` | Product listing, search filtering, category management |
| **Cart & Checkout** | `/api/cart`, `/api/orders` | Cart modification, discount coupons, order placement |
| **Delivery & Tracking**| `/api/tracking`, `/api/address` | Geolocation updates, live courier position |
| **Customer Care** | `/api/chat`, `/api/reviews` | Support messaging, rating, product reviews |
| **Personalization** | `/api/reminders`, `/api/favorites` | Event calendar alarms, saved wishlists |
| **Administration** | `/api/admin`, `/api/analytics` | Store analytics, user role management, catalog edits |

> 💡 **Swagger API Reference**: Run the backend and visit `http://localhost:5000/api-docs` for interactively testing each route.

---

## 🔌 Real-Time WebSockets Architecture

Real-time capabilities are managed via Socket.io channels:

* `connection`: Authenticates socket connection with JWT.
* `join_order_room`: Subscribes clients to live order updates.
* `location_update`: Receives real-time GPS coordinates from delivery drivers.
* `chat_message`: Handles live bidirectional communications between customer and support representatives.

---

## 🔒 Security & Production Hardening

1. **HTTP Security Headers**: Powered by `helmet` to configure secure CSP, HSTS, and X-Frame headers.
2. **Sanitization**: Protects against NoSQL injection via `express-mongo-sanitize` and HTTP Parameter Pollution using `hpp`.
3. **Strict Rate Limiting**: Endpoint protection via `express-rate-limit` (General: 200 req / 15 min; Auth: 10 req / 15 min; Admin: 50 req / 15 min).
4. **Data Validation**: Strict input validation using `express-validator` (backend) and `zod` schemas (mobile).

---

## 📜 Available CLI Scripts

### Backend (`/backend`)
- `npm run dev` — Starts Node server in watch mode using Nodemon.
- `npm run start` — Starts standard Node.js server instance.
- `npm run seed` — Populates database with sample categories and products.
- `npm run seed:users` — Populates sample administrator and client users.

### Mobile App (`/mobile-app`)
- `npm run start` — Starts Expo bundler Metro server.
- `npm run android` — Launches build for Android emulator.
- `npm run ios` — Launches build for iOS simulator.
- `npm run web` — Builds & launches web application preview.
- `npm run lint` — Runs Expo ESLint check.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p center align="center">
  Crafted with ❤️ for delivering joy & beautiful floral experiences.
</p>
