const mongoose = require("mongoose");

const CurrancyCore = new mongoose.Schema({
  id: { type: Number, default: 0 },
  Name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const CurrencyModel = mongoose.model("Currency",CurrancyCore);

module.exports=CurrencyModel