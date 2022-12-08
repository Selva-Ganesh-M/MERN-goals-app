const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { isValidObjectId } = require("mongoose");
const User = require("../models/userModel");

const authHandler = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401);
    throw new Error("user not authorized. authorization token missing");
  }
  const token = authorization.split(" ")[1];
  const { id } = jwt.verify(token, process.env.SECRET);
  if (!isValidObjectId(id)) {
    res.status(401);
    throw new Error("authorization failed. invalid token");
  }
  const user = await User.findOne({ _id: id });
  if (!user) {
    res.status(400);
    throw new Error("user not found.");
  }
  req.user = user;
  return next();
});

module.exports = authHandler;
