const asyncHandler = require("express-async-handler");
const { default: mongoose, isValidObjectId } = require("mongoose");
const Goal = require("../models/goalModel");

const getGoals = asyncHandler(async (req, res) => {
  console.log(req.user);
  const { _id } = req.user._id;
  const goals = await Goal.find({ user: _id });
  res.status(200).json(goals);
});

const createGoal = asyncHandler(async (req, res) => {
  if (!req.body || !req.body.text) {
    res.status(400);
    throw new Error("text field can't be empty");
  }
  const user = await Goal.create({ ...req.body, user: req.user._id });
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
  const goal = await Goal.findOne({ _id: req.params.id });
  if (!(goal.user.toString() === req.user._id.toString())) {
    console.log("inside if");
    res.status(401);
    throw new Error("user is not authorized to perform this task.");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(
    { _id: req.params.id },
    {
      text: req.body.text,
    },
    { new: true }
  );
  if (!updatedGoal) {
    res.status(400);
    throw new Error("Goal not found...");
  }
  res.status(200).json(updatedGoal);
});

const deleteGoal = asyncHandler(async (req, res) => {
  console.log(req.user);
  if (!isValidObjectId(req.params.id)) {
    throw new Error("Invalid object id");
  }
  const goal = await Goal.findOne({ _id: req.params.id });
  if (!(goal.user.toString() === req.user._id.toString())) {
    console.log("inside if");
    res.status(401);
    throw new Error("user is not authorized to perform this task.");
  }
  // const deletedGoal = await Goal.findOneAndDelete({ _id: req.params.id });
  console.log("after if");
  const deletedGoal = await goal.remove();
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
