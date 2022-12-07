const asyncHandler = require("express-async-handler");

const getGoals = asyncHandler(async (req, res) => {
  res.status(400);
  throw new Error("This is the error.");
});

const createGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "createa a goal" });
});

const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `update ${req.params.id}` });
});

const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `delete ${req.params.id}` });
});

module.exports = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
};
