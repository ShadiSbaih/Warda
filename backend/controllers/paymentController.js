const mongoose = require("mongoose");
const Payment = require("../models/Payment");
const Order = require("../models/Order");

const isAdminOrDelivery = (user) => ["admin", "delivery"].includes(user.role);

// Create Payment
exports.createPayment = async (req, res) => {
  try {
    const { order: orderId, amount, paymentMethod = "Cash", transactionId = "" } = req.body;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ success: false, message: "Invalid order id" });
    }

    const order = await Order.findOne({ _id: orderId, user: req.user._id });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found or access denied" });
    }

    const payment = await Payment.create({
      user: req.user._id,
      order: orderId,
      amount: amount || order.total,
      paymentMethod,
      transactionId,
      status: "Pending",
    });

    res.status(201).json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get My Payments
exports.getPayments = async (req, res) => {
  try {
    const filter = isAdminOrDelivery(req.user) ? {} : { user: req.user._id };
    const payments = await Payment.find(filter)
      .populate("order")
      .sort({ createdAt: -1 });

    res.json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Payment
exports.getPayment = async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    if (!isAdminOrDelivery(req.user)) {
      filter.user = req.user._id;
    }

    const payment = await Payment.findOne(filter).populate("order");

    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    res.json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Payment Status (admin only)
exports.updatePaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    res.json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
