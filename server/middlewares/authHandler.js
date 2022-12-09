const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { isValidObjectId } = require("mongoose");
const User = require("../models/userModel");

const authHandler = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(req.headers);
  if (!authorization) {
    res.status(401);
    throw new Error("user not authorized. authorization token missing");
  }
  console.log("normal - authorization", authorization);
  console.log("stringified - authorization", JSON.stringify(authorization));
  const token = authorization.split(" ")[1];
  console.log("server-token-type", typeof token);
  console.log("normal - token", token);
  console.log("stringified - token", JSON.stringify(token));
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
