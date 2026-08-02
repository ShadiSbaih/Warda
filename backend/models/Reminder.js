const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    person: {
      type: String,
      default: "",
    },

    date: {
      type: Date,
      required: true,
    },

    occasion: {
      type: String,
      enum: ["birthday", "anniversary", "graduation", "other"],
      default: "birthday",
    },

    notifyDaysBefore: {
      type: Number,
      default: 1,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reminder", reminderSchema);
