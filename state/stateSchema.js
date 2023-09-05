const mongoose = require("mongoose");

const SateCore = new mongoose.Schema({
  id: { type: Number, default: 0 },
  Name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const StateModel = mongoose.model("STATE", SateCore);

module.exports = StateModel;
