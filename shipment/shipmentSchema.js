const mongoose = require("mongoose");

const ShipmentCore = new mongoose.Schema({
  shipment: { type: Number, default: 0 },
  gpNumber: { type: String },
  gpDate: { type: Date },
  dcNumber: { type: String },
  dcDate: { type: Date },
  isDeleted: { type: Boolean, default: false },
  specialInstruction: { type: String },
  shippedQty: { type: Number },
  salesContract: { type: mongoose.Schema.ObjectId },
});

const ShipmentModel = mongoose.model("Shipment", ShipmentCore);
module.exports = ShipmentModel;
