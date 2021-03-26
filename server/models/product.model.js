const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    brand: { type: String, required: true },
    description: { type: String, required: true },
    label: { type: String, required: true },
    name: { type: String, required: true },
    path: { type: String, required: true },
    price: { type: Number, required: true },
    sizes: { type: Array, of: String, required: true },
    src: { type: Array, of: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
