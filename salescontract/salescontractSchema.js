const mongoose = require("mongoose");

const SalescontractCore = new mongoose.Schema({
  id: { type: Number, default: 0 },
  tran: { type: Number, default: 1 },
  date: { type: Date, default: Date.now() },
  po: { type: String, required: true },
  contract: { type: String, unique: true },
  specialInstruction: { type: String },
  invoice: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  poDate: { type: Date, default: Date.now() },
  contractDate: { type: Date, default: Date.now() },
  tc_no: { type: String },
  vendorgarment: { type: String },
  shipment: { type: Boolean, default: false },
  customer: { type: mongoose.Schema.ObjectId },
  brand: { type: mongoose.Schema.ObjectId },
  paymentterm: { type: mongoose.Schema.ObjectId },
  shipvia: { type: mongoose.Schema.ObjectId },
});
const SalesContractModel = mongoose.model("SALESCONTRACTS", SalescontractCore);
module.exports = SalesContractModel;
