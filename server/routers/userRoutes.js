const express = require("express");
const { signup, getAllUsers, login } = require("../controllers/userController");
const authHandler = require("../middlewares/authHandler");
const router = express.Router();

router.get("/", authHandler, getAllUsers);
router.post("/signup", signup);

router.post("/login", login);

module.exports = router;
