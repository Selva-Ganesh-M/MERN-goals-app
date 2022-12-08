const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { red } = require("colors");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "please enter user name."],
    },
    email: {
      type: String,
      required: [true, "Please enter an email address"],
      unique: true,
    },
    password: {
      type: "String",
      required: [true, "Please enter the password."],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.signup = async function (req, res) {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields.");
  }

  if (!validator.isEmail(email)) {
    res.status(400);
    throw new Error("please enter a valid email.");
  }

  if (await this.findOne({ email })) {
    res.status(400);
    throw new Error("email already exists.");
  }

  if (!validator.isStrongPassword(password)) {
    res.status(400);
    throw new Error("password not strong enough");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return await this.create({
    userName,
    email,
    password: hash,
  });
};

module.exports = mongoose.model("User", userSchema);
