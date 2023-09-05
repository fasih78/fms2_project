const mongoose = require("mongoose");

let CustomerCore = new mongoose.Schema({
  id: { type: Number, default: 1 },
  name: { type: String, required: true },
  title: { type: String },
  contact: { type: String },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String },
  zipcode: { type: String },
  saletaxreg: { type: String },
  country: { type: mongoose.Schema.ObjectId, required: true },
  city: { type: mongoose.Schema.ObjectId, required: true },
  state: { type: mongoose.Schema.ObjectId, required: true },
  Date: { type: Date, default: Date.now() },
  ntn: { type: String },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});
let CustomerModel = mongoose.model("CUSTOMER", CustomerCore);
module.exports = CustomerModel;
