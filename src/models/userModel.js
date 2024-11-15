/**
 * File: userModel.js
 * Author: Sunil Balami
 * StudentID: 200578456
 * Date: 2024-11-15
 * Description: This defines the Schema for user using mongoose and export it.
 */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//Creating modes
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// encrypting password before creating or updating user in the database
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//password validation
UserSchema.methods.isValidPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

//exporting functions
const User = mongoose.model("User", UserSchema);
module.exports = User;
