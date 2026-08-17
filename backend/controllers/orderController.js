const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Coupon = require("../models/Coupon");

const DEFAULT_DRIVER = {
  name: "Tariq Al-Harbi",
  phone: "+966 50 123 4567",
  plate: "KSA 4821",
  rating: 4.9,
  vehicle: "White Lexus ES",
  avatar: "",
};

const VALID_STATUS = ["confirmed", "preparing", "on_the_way", "delivered", "cancelled"];

const calculateTotals = (items, discountCode) => {
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const wrappingTotal = items.length > 0 ? 5 : 0;
  const deliveryFee = subtotal > 150 || items.length === 0 ? 0 : 10;

  let discount = 0;
  if (discountCode) {
    // Server-side coupon validation placeholder — real lookup added in T3.4/T6.x
    const coupons = {
      WARDA20: { type: "percent", value: 0.2 },
      WELCOME: { type: "fixed", value: 15 },
      VIP50: { type: "percent", value: 0.5 },
      GIFT10: { type: "fixed", value: 10 },
    };
    const coupon = coupons[discountCode.toUpperCase()];
    if (coupon) {
      discount = coupon.type === "percent" ? subtotal * coupon.value : Math.min(subtotal, coupon.value);
    }
  }

  const total = Math.max(0, subtotal + wrappingTotal + deliveryFee - discount);
  return { subtotal, wrappingTotal, deliveryFee, discount, total };
};

// Create Order
exports.createOrder = async (req, res) => {
  try {
    const {
      items,
      deliveryAddress,
      recipientName,
      recipientPhone,
      giftMessage,
      isAnonymous,
      deliverySlot,
      scheduledDelivery,
      discountCode,
    } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Order must contain at least one item" });
    }

    const productIds = items.map((item) => item.productId || item.product);
    const products = await Product.find({ _id: { $in: productIds } });
    const productMap = new Map(products.map((p) => [p._id.toString(), p]));

    const orderItems = [];
    for (const item of items) {
      const productId = item.productId || item.product;
      const product = productMap.get(productId?.toString());
      if (!product) {
        return res.status(400).json({ success: false, message: `Product ${productId} not found` });
      }

      orderItems.push({
        product: product._id,
        title: item.title || product.name,
        image: item.image || product.image,
        quantity: item.quantity || 1,
        unitPrice: item.unitPrice || product.price,
        wrappingColor: item.wrappingColor || "",
        wrappingName: item.wrappingName || "",
        giftMessage: item.giftMessage || "",
        recipientName: item.recipientName || "",
        isAnonymous: !!item.isAnonymous,
        customPhotoUrl: item.customPhotoUrl || "",
      });
    }

    const totals = calculateTotals(orderItems, discountCode);
    const shop = products[0]?.shop || null;

    const order = await Order.create({
      user: req.user._id,
      shop,
      items: orderItems,
      deliveryAddress: {
        title: deliveryAddress?.title || "Delivery Address",
        fullName: deliveryAddress?.fullName || "",
        phone: deliveryAddress?.phone || "",
        address: deliveryAddress?.address || deliveryAddress || "",
        city: deliveryAddress?.city || "",
        zipCode: deliveryAddress?.zipCode || "",
        coordinates: deliveryAddress?.coordinates || { lat: null, lng: null },
      },
      recipientName: recipientName || "",
      recipientPhone: recipientPhone || "",
      giftMessage: giftMessage || "",
      isAnonymous: !!isAnonymous,
      paymentMethod: "cod",
      paymentStatus: "pending",
      deliverySlot: deliverySlot || "Express Now",
      scheduledDelivery: scheduledDelivery || null,
      status: "confirmed",
      statusHistory: [{ status: "confirmed", note: "Order confirmed", updatedBy: req.user._id }],
      driver: DEFAULT_DRIVER,
      driverLocation: { lat: 24.7136, lng: 46.6753, updatedAt: new Date() },
      ...totals,
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get User Orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product", "name image price")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Orders (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email phone")
      .populate("items.product", "name image price")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get the delivery queue. Until dispatch assignment is enabled, active orders
// are the delivery team's queue; this keeps the demo role functional.
exports.getDeliveryOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      status: { $in: ["confirmed", "preparing", "on_the_way", "delivered"] },
    })
      .populate("user", "name email phone")
      .populate("items.product", "name image price")
      .sort({ status: 1, createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Order
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id })
      .populate("items.product", "name image price")
      .populate("user", "name email phone");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Status (Admin)
exports.updateStatus = async (req, res) => {
  try {
    const { status, note } = req.body;

    if (!VALID_STATUS.includes(status)) {
      return res.status(400).json({ success: false, message: `Invalid status. Allowed: ${VALID_STATUS.join(", ")}` });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status,
        $push: { statusHistory: { status, note: note || `Status updated to ${status}`, updatedBy: req.user._id } },
      },
      { new: true }
    )
      .populate("items.product", "name image price")
      .populate("user", "name email phone");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Broadcast update to anyone in this order room
    const { getIO } = require("../socket/socket");
    const io = getIO();
    if (io) {
      io.to(order._id.toString()).emit("statusUpdate", { orderId: order._id.toString(), status, note });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Payment Status (Admin) - marks COD as paid
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    if (!["pending", "paid", "refunded"].includes(paymentStatus)) {
      return res.status(400).json({ success: false, message: "Invalid payment status" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true }
    )
      .populate("items.product", "name image price")
      .populate("user", "name email phone");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cancel Order (User)
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.status !== "confirmed") {
      return res.status(400).json({ success: false, message: "Order can only be cancelled before preparation starts" });
    }

    order.status = "cancelled";
    order.statusHistory.push({ status: "cancelled", note: "Cancelled by customer", updatedBy: req.user._id });
    await order.save();

    // Broadcast cancellation
    const { getIO } = require("../socket/socket");
    const io = getIO();
    if (io) {
      io.to(order._id.toString()).emit("statusUpdate", { orderId: order._id.toString(), status: "cancelled" });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
