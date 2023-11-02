const mongoose = require("mongoose");

const RoyalityCore = new mongoose.Schema({
  id: { type: Number },
  Royality_no: { type: Number },
  isDeleted: { type: Boolean, default: false },
  paid: { type: Boolean },
  paymentDate: { type: Date },
  amount: { type: Number },
  saleTaxinvoicedate: { type: Date },
  royalityrate: { type: Number },
  payment: { type: mongoose.Types.ObjectId },
  invoice: { type: mongoose.Types.ObjectId },
  customer: { type: mongoose.Types.ObjectId },
  saleContract: { type: mongoose.Types.ObjectId },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});
const RoyalityModel = mongoose.model("ROYALITY", RoyalityCore);

module.exports = RoyalityModel;
