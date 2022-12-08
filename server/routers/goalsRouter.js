const express = require("express");
const router = express.Router();
const {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalsController");
const authHandler = require("../middlewares/authHandler");

router.use(authHandler);

router.route("/").get(getGoals).post(createGoal);

router.route("/:id").put(updateGoal).delete(deleteGoal);

module.exports = router;
