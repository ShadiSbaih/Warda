const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");
const Order = require("../models/Order");

let io;

const initializeSocket = (server) => {
  const { Server } = require("socket.io");

  const corsOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
    : ["http://localhost:8081", "http://localhost:19006", "http://localhost:3000"];

  io = new Server(server, {
    cors: {
      origin: corsOrigins,
      credentials: true,
    },
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token || socket.handshake.query?.token;

      if (!token) {
        return next(new Error("Authentication required"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return next(new Error("User not found"));
      }

      socket.userId = user._id.toString();
      socket.userRole = user.role;
      next();
    } catch (error) {
      next(new Error("Invalid or expired token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("joinOrder", async (orderId) => {
      if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
        return socket.emit("error", { message: "Invalid order id" });
      }

      try {
        const order = await Order.findById(orderId);
        if (!order) {
          return socket.emit("error", { message: "Order not found" });
        }

        const isAuthorized =
          order.user.toString() === socket.userId ||
          ["admin", "delivery"].includes(socket.userRole);

        if (!isAuthorized) {
          return socket.emit("error", { message: "Access denied to this order room" });
        }

        socket.join(orderId);
        socket.emit("joined", { orderId, message: "Joined order room" });
      } catch (error) {
        socket.emit("error", { message: "Unable to join order room" });
      }
    });

    socket.on("disconnect", () => {
      console.log("Disconnected:", socket.id);
    });
  });
};

const getIO = () => io;

module.exports = {
  initializeSocket,
  getIO,
};
