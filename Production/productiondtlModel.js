const mongoose = require("mongoose");

const ProductiondtlCore = new mongoose.Schema({
  date: { type: Date, default: Date.now() },
  lot: { type: String, required: true },
  bales: { type: String, required: true },
  qty: { type: Number, required: true },
  uom: { type: String },
  isDeleted: { type: Boolean, default: false },
  product: { type: mongoose.Schema.ObjectId, required: true },
  production: { type: mongoose.Schema.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});
const ProductiondtlModel = mongoose.model("PRODUCTIONDTL", ProductiondtlCore);
module.exports = ProductiondtlModel;
