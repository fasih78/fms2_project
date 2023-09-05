const mongoose = require("mongoose");

const MachineCore = new mongoose.Schema({
  id: { type: Number, default: 0 },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const MachineModel = mongoose.model("MACHINE", MachineCore);
module.exports = MachineModel;
