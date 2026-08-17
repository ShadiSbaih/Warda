const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const http = require("http");
const querystring = require("node:querystring");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");

// Config
dotenv.config();

const connectDB = require("./config/db");
const logger = require("./config/logger");
const { swaggerUi, specs } = require("./config/swagger");
const { initializeSocket } = require("./socket/socket");

// ======================
// Environment validation
// ======================

const requiredEnv = ["MONGO_URI", "JWT_SECRET"];
for (const key of requiredEnv) {
  if (!process.env[key]) {
    logger.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
}

if (process.env.JWT_SECRET.length < 32) {
  logger.warn("JWT_SECRET is shorter than 32 characters. Generate a stronger random secret for production.");
}

// ======================
// Database
// ======================

connectDB();

// ======================
// App
// ======================

const app = express();
const server = http.createServer(app);

// Express 5 creates req.query through its configured parser, so sanitize the
// parsed query before it is exposed to route handlers.
app.set("query parser", (query) =>
  mongoSanitize.sanitize(querystring.parse(query))
);

// Initialize Socket.io
initializeSocket(server);

// ======================
// Security Middlewares
// ======================

app.use(helmet());

const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : ["http://localhost:8081", "http://localhost:19006", "http://localhost:3000"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || corsOrigins.includes(origin)) return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

// express-mongo-sanitize 2.x was written for Express 4 and assigns a new
// object to req.query. Express 5 exposes req.query as getter-only, so sanitize
// each request object in place instead of using the package middleware wrapper.
app.use((req, res, next) => {
  ["body", "params", "headers"].forEach((key) => {
    if (req[key]) mongoSanitize.sanitize(req[key]);
  });
  next();
});
app.use(hpp());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Rate limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later" },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: "Too many authentication attempts, please try again later" },
});

const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { success: false, message: "Too many admin requests, please try again later" },
});

app.use("/api", generalLimiter);
app.use("/api/auth", authLimiter);
app.use("/api/admin", adminLimiter);

// ======================
// Static & Docs
// ======================

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

// ======================
// Routes
// ======================

// Authentication
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

// Shop
const shopRoutes = require("./routes/shopRoutes");

// Category
const categoryRoutes = require("./routes/categoryRoutes");

// Product
const productRoutes = require("./routes/productRoutes");

// Search
const searchRoutes = require("./routes/searchRoutes");

// Cart
const cartRoutes = require("./routes/cartRoutes");

// Orders
const orderRoutes = require("./routes/orderRoutes");

// Coupons
const couponRoutes = require("./routes/couponRoutes");

// Address
const addressRoutes = require("./routes/addressRoutes");

// Notification
const notificationRoutes = require("./routes/notificationRoutes");

// Reviews
const reviewRoutes = require("./routes/reviewRoutes");

// Favorites
const favoriteRoutes = require("./routes/favoriteRoutes");

// Profile
const profileRoutes = require("./routes/profileRoutes");

// Chat
const chatRoutes = require("./routes/chatRoutes");

// Upload
const uploadRoutes = require("./routes/uploadRoutes");

// Admin
const adminRoutes = require("./routes/adminRoutes");

// Admin Auth
const adminAuthRoutes = require("./routes/adminAuthRoutes");

// Analytics
const analyticsRoutes = require("./routes/analyticsRoutes");

// OTP
const otpRoutes = require("./routes/otpRoutes");

// Email Verification
const verificationRoutes = require("./routes/verificationRoutes");

// Tracking
const trackingRoutes = require("./routes/trackingRoutes");

// Push Notification
const pushRoutes = require("./routes/pushRoutes");

// Reminders
const reminderRoutes = require("./routes/reminderRoutes");

// ======================
// API Routes
// ======================

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use("/api/shops", shopRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/products", productRoutes);

app.use("/api/search", searchRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/coupons", couponRoutes);

app.use("/api/address", addressRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/reviews", reviewRoutes);

app.use("/api/favorites", favoriteRoutes);

app.use("/api/profile", profileRoutes);

app.use("/api/chat", chatRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/admin", adminAuthRoutes);

app.use("/api/analytics", analyticsRoutes);

app.use("/api/otp", otpRoutes);

app.use("/api/verification", verificationRoutes);

app.use("/api/tracking", trackingRoutes);

app.use("/api/push", pushRoutes);

app.use("/api/reminders", reminderRoutes);

// ======================
// Root Route
// ======================

app.get("/", (req, res) => {
  res.json({
    success: true,
    app: "Warda — Gifts & Flowers Delivery API",
    version: "1.0.0",
    status: "Running",
    documentation: "/api-docs",
  });
});

// ======================
// 404 Route
// ======================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ======================
// Error Handler
// ======================

app.use((err, req, res, next) => {
  logger.error(err.stack);

  const isDev = process.env.NODE_ENV === "development";
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(isDev && { stack: err.stack }),
  });
});

// ======================
// Server
// ======================

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  logger.info(`Gifts Delivery API Started`);
  console.log(
    `🚀 Server Running on http://localhost:${PORT}`
  );
  console.log(
    `📘 Swagger Docs: http://localhost:${PORT}/api-docs`
  );
});
