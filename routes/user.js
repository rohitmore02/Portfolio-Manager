const express = require("express");
const { protect } = require("../middleware/auth");
const router = express.Router();
const { getUser } = require("../controllers/user");

// /users/:id will be used to get user by id to show the user his own details
router.get("/users/:id", getUser);


module.exports = router;
