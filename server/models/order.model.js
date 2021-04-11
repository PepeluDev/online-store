const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderItemSchema = new Schema(
  {
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: { type: String, required: true },
    sizes: {
      type: Map,
      of: String,
      required: true,
    },
  },
  { _id: false }
);

const orderSchema = new Schema(
  {
    paypalOrderID: { type: String, required: true },
    email: { type: String },
    address: { type: String },
    orderItems: { type: [orderItemSchema], required: true },
    payed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
