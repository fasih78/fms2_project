const mongoose = require("mongoose");

const Payment_termCore = new mongoose.Schema({
  id: { type: Number, default: 0 },
  Name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const Payment_termModel= mongoose.model("PAYMENTerm", Payment_termCore);
module.exports = Payment_termModel