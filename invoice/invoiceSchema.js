const mongoose = require("mongoose");

const InvoiceCore = new mongoose.Schema({
  id:{type:Number,default: 0 },
  inv: { type: Number, default: 0 },
  date: { type: Date, default: Date.now() },
  specialInstuction: { type: String },
  saleTaxinvoice_no: { type: String },
  payment: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  salesContract: { type: mongoose.Schema.ObjectId },
});
const InvoiceModel = mongoose.model("INVOICE", InvoiceCore);

module.exports = InvoiceModel;
