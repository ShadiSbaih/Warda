const Order = require("../models/Order");
const { getIO } = require("../socket/socket");

const emitToOrder = (orderId, event, payload) => {
  try {
    const io = getIO();
    if (io) {
      io.to(orderId.toString()).emit(event, payload);
    }
  } catch (err) {
    console.error("Socket emit failed:", err.message);
  }
};

// Update driver location and broadcast it (admin only)
exports.updateDriverLocation = async (req, res) => {
  try {
    const { lat, lng } = req.body;

    if (lat == null || lng == null || isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({ success: false, message: "Valid lat and lng are required" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.driverLocation = { lat, lng, updatedAt: new Date() };
    await order.save();

    emitToOrder(order._id, "locationUpdate", {
      orderId: order._id.toString(),
      location: { lat, lng },
      updatedAt: order.driverLocation.updatedAt,
    });

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get current driver location (owner or admin)
exports.getDriverLocation = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "_id");
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const isOwner = order.user._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    res.json({
      success: true,
      location: order.driverLocation,
      driver: order.driver,
      status: order.status,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Legacy-ish tracking update — mostly replaced by order status endpoint
exports.updateTracking = async (req, res) => {
  try {
    const { status, latitude, longitude } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    emitToOrder(order._id, "statusUpdate", {
      orderId: order._id.toString(),
      status,
      location: latitude != null && longitude != null ? { lat: latitude, lng: longitude } : null,
    });

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
