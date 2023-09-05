const mongoose = require("mongoose");

const ProductCore = new mongoose.Schema({
  id: { type: Number, default: 0 },
  name: { type: String, required: true },
  price: { type: String, required: true },
  currency: { type: mongoose.Schema.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const ProductModel = mongoose.model("PRODUCT", ProductCore);

module.exports = ProductModel;
