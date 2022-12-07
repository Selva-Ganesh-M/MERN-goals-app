const asyncHandler = require("express-async-handler");
const { default: mongoose, isValidObjectId } = require("mongoose");
const Goal = require("../models/goalModel");

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({});
  res.status(200).json(goals);
});

const createGoal = asyncHandler(async (req, res) => {
  if (!req.body || !req.body.text) {
    res.status(400);
    throw new Error("text field can't be empty");
  }
  const user = await Goal.create(req.body);
  res.status(200).json(user);
});

const updateGoal = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("invalid _id value");
  }
  console.log(req.body);
  if (!req.body || !req.body.text) {
    res.status(400);
    throw new Error("data fields missing");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  if (!updatedGoal) {
    res.status(400);
    throw new Error("Goal not found...");
  }
  res.status(200).json(updatedGoal);
});

const deleteGoal = asyncHandler(async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    throw new Error("Invalid object id");
  }
  const deletedGoal = await Goal.findOneAndDelete({ _id: req.params.id });
  if (!deletedGoal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  res.status(200).json(deletedGoal);
});

module.exports = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
};
