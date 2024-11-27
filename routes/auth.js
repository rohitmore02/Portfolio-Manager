const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controllers/user");

// Register User
router.post("/register", signUp);

// Login User
router.get("/login", signIn);

module.exports = router;
