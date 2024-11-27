const express = require("express");
const { protect } = require("../middleware/auth");
const router = express.Router();
const { getUser } = require("../controllers/user");


router.get("/users/:id", getUser);


module.exports = router;
