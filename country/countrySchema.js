const mongoose = require("mongoose");

const CountryCore = new mongoose.Schema({
  id: { type: Number, default: 0 },
  Name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const CountryModel = mongoose.model("Country",CountryCore);

module.exports=CountryModel