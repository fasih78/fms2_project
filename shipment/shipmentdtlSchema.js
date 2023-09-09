const mongoose = require("mongoose");

const ShipmentdtlCore = new mongoose.Schema({
  qty: { type: Number },
  rate: { type: Number },
  amount: { type: Number },
  gpDate: { type: Date, default: Date.now() },
  uom: { type: String },
  isDeleted: { type: Boolean, default: false },
  saleTaxRate: { type: Number },
  saleTaxAmount: { type: Number },
  product: { type: mongoose.Schema.ObjectId },
  currency: { type: mongoose.Schema.ObjectId },
  shipment: { type: mongoose.Schema.ObjectId },
});
const ShipmentdtlModel = mongoose.model("SHIPMENTDTL", ShipmentdtlCore);
module.exports = ShipmentdtlModel;
