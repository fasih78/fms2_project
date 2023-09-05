const mongoose = require("mongoose");

const SalescontractDtlCore = new mongoose.Schema({
  qty: { type: Number, required: true },
  rate: { type: Number, required: true },
  amount: { type: Number, required: true },
  uom: { type: Number, required: true },
  contractDate: { type: Date, default: Date.now() },
  isDeleted: { type: Boolean, default: false },
  shipmentDate: { type: Date },
  exchangeRate: { type: Number },
  shipment: { type: Boolean, default: false },
  product: { type: mongoose.Schema.ObjectId },
  currency: { type: mongoose.Schema.ObjectId },
  salesContract: { type: mongoose.Schema.ObjectId },
});
const SaleContractdtlModel = mongoose.model(
  "SALESCONTRACTDTL",
  SalescontractDtlCore
);
module.exports = SaleContractdtlModel;
