const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
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
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    items: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);