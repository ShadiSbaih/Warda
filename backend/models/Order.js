const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },

    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    wrappingColor: {
      type: String,
      default: "",
    },

    wrappingName: {
      type: String,
      default: "",
    },

    giftMessage: {
      type: String,
      default: "",
    },

    recipientName: {
      type: String,
      default: "",
    },

    isAnonymous: {
      type: Boolean,
      default: false,
    },

    customPhotoUrl: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const driverSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Warda Driver" },
    phone: { type: String, default: "" },
    plate: { type: String, default: "" },
    rating: { type: Number, default: 4.8 },
    vehicle: { type: String, default: "" },
    avatar: { type: String, default: "" },
  },
  { _id: false }
);

const locationSchema = new mongoose.Schema(
  {
    lat: { type: Number, default: 24.7136 },
    lng: { type: Number, default: 46.6753 },
    updatedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const statusHistorySchema = new mongoose.Schema(
  {
    status: { type: String, required: true },
    note: { type: String, default: "" },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },

    items: [orderItemSchema],

    deliveryAddress: {
      title: { type: String, default: "" },
      fullName: { type: String, default: "" },
      phone: { type: String, default: "" },
      address: { type: String, default: "" },
      city: { type: String, default: "" },
      zipCode: { type: String, default: "" },
      coordinates: {
        lat: { type: Number, default: null },
        lng: { type: Number, default: null },
      },
    },

    recipientName: {
      type: String,
      default: "",
    },

    recipientPhone: {
      type: String,
      default: "",
    },

    giftMessage: {
      type: String,
      default: "",
    },

    isAnonymous: {
      type: Boolean,
      default: false,
    },

    customPhotoUrl: {
      type: String,
      default: "",
    },

    paymentMethod: {
      type: String,
      enum: ["cod"],
      default: "cod",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded"],
      default: "pending",
    },

    subtotal: {
      type: Number,
      default: 0,
    },

    wrappingTotal: {
      type: Number,
      default: 0,
    },

    deliveryFee: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    total: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["confirmed", "preparing", "on_the_way", "delivered", "cancelled"],
      default: "confirmed",
    },

    statusHistory: [statusHistorySchema],

    scheduledDelivery: {
      type: Date,
      default: null,
    },

    deliverySlot: {
      type: String,
      default: "Express Now",
    },

    driver: {
      type: driverSchema,
      default: () => ({}),
    },

    driverLocation: {
      type: locationSchema,
      default: () => ({}),
    },

    review: {
      rating: { type: Number, default: null },
      comment: { type: String, default: "" },
      tags: { type: [String], default: [] },
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate order number before saving
orderSchema.pre("save", async function (next) {
  if (!this.orderNumber) {
    const count = await mongoose.model("Order").countDocuments();
    this.orderNumber = `WD-${1000 + count + 1}`;
  }
  next();
});

module.exports = mongoose.model("Order", orderSchema);
