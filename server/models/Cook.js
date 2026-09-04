const mongoose = require("mongoose");

const cookSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    businessName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    foodType: {
      type: String,
      enum: ["Vegetarian", "Non-Vegetarian", "Both"],
      required: true,
    },

    pricePerMeal: {
      type: Number,
      required: true,
      min: 0,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cook", cookSchema);