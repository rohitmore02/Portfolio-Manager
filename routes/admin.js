const express = require("express");
const { protect } = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const router = express.Router();
const { getUsers } = require("../controllers/admin");

router.post("/users", protect, authorize([ "Admin", "Moderator" ]), getUsers);

router.put("/users/:id", protect, authorize([ "Admin", "Moderator" ]), getUsers);

router.delete("/users/:id", protect, authorize([ "Admin", "Moderator" ]), getUsers);

module.exports = router;
