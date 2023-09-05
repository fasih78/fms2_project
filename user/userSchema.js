const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  salt: { type: String },
  newpassword:{type:String},
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
