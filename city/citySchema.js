const mongoose = require("mongoose");

const CityCore = new mongoose.Schema({
  id: { type: Number, default: 0 },
  Name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const CityModel = mongoose.model("CITY",CityCore);

module.exports=CityModel