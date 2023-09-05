const mongoose = require("mongoose");

const ProductionCore = new mongoose.Schema({
  id: { type: Number, default: 0 },
  tran: { type: Number, default: 0 },
  date: { type: Date, default: Date.now() },
  productionType: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  specialInstruction: { type: String },
  Productiondtl:{type:Array},
  machine: { type: mongoose.Schema.ObjectId, required: true },
  customer: { type: mongoose.Schema.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const ProductionModel = mongoose.model("PRODUCTION", ProductionCore);
module.exports = ProductionModel;
                                                  