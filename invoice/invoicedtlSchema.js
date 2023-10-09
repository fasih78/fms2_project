const mongoose = require("mongoose");

const InvoicedtlCore = new mongoose.Schema({
  qty: { type: Number },
  rate: { type: Number },
  amount: { type: Number },
  exchangeRate: { type: Number },
  uom: { type: String },
  date: { type: Date, default: Date.now() },
  isDeleted: { type: Boolean, default: false },
  saleTaxRate: { type: Number },
  saleTaxAmount: { type: Number },
  payment: { type: Boolean, default: false },
  product: { type: mongoose.Schema.ObjectId },
  currency: { type: mongoose.Schema.ObjectId },
  invoice: { type: mongoose.Schema.ObjectId },
  customer:{type:mongoose.Schema.ObjectId}
});

const InvoicedtlModel = mongoose.model("INVOICEDTL", InvoicedtlCore);
module.exports = InvoicedtlModel;
