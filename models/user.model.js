const mongoose = require("mongoose");
const userschema = mongoose.Schema(
  {
    email: String,
    password: String,
    confirmPassword: String,
  },
  {
    versionKey: false,
  }
);

const UserModel = new mongoose.model("user", userschema);
module.exports = { 
    UserModel 
}