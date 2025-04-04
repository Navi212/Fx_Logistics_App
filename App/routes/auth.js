const express = require("express");
const {loginUser, logoutUser} = require("../controllers/auth");
const {createUser} = require("../controllers/user");
const router = express.Router();

router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/register", createUser);

module.exports = router;