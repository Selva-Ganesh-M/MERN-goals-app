const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const validator = require("validator");

// jwt token creator
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "3d" });
};

// get all users
const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await User.find({});
  res.status(200).json(allUsers);
});

// sign up a user

const signup = asyncHandler(async (req, res) => {
  const user = await User.signup(req, res);
  if (!user) {
    throw new Error("Unknown error. User signup failed. ");
  }
  const { email, _id, userName } = user;
  const token = generateToken(_id);
  res.status(201).json({ email, _id, userName, token });
});

// login user
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("please fill all the fields");
  }
  if (!validator.isEmail(email)) {
    res.status(400);
    throw new Error("Invalid email address.");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("user not found.");
  }
  const token = generateToken(user._id);
  res.status(200).json({
    email,
    token,
  });
});

// const signUp = asyncHandler(async (req, res)=>{

// })

module.exports = { signup, getAllUsers, login };
