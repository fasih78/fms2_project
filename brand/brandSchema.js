const mongoose = require("mongoose");

const BrandCore = new mongoose.Schema({
  id: { type: Number, default: 0 },
  Name: { type: String, required: true },
});

const BrandModel = mongoose.model("Brand", BrandCore);

module.exports = BrandModel;
