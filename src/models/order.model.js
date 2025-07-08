const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    shippmentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "shippingAddress",
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "products", // adjust if your product model is named differently
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("order", orderSchema);

module.exports = {
  OrderModel,
};
