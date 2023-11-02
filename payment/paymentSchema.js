const { MongoGridFSChunkError } = require("mongodb");
const mongoose = require("mongoose");

const PaymentCore = new mongoose.Schema({
  id: { type: Number, default: 0 },
  paymentReceivedDate: { type: Date, default: Date.now() },
  paymentDate: { type: Date, default: Date.now() },
  cheaqueNo: { type: String },
  isDeleted: { type: Boolean, default: false },
  specialInstruction: { type: String },
  royality: { type: Boolean, default: false },
  invoice: { type: mongoose.Schema.ObjectId },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const PaymentModel = mongoose.model("payment", PaymentCore);
module.exports = PaymentModel;
