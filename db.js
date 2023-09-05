const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () => {
  mongoose.set("strictQuery", false);
  mongoose.set("debug", true);
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => {
      console.log("DATABASE INFO === CONNECTED ");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;
