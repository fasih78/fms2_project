const mongoose = require("mongoose");

const ShipViaCore = new mongoose.Schema({
  id: { type: Number, default: 0 },
  Name: { type: String, required: true },
});
const ShipViaModel = mongoose.model("ShipVia", ShipViaCore);
module.exports = ShipViaModel;
