// Admin Router
const express = require("express");
const router = express.Router();

router.get("/dashboard", (req, res) => {
    res.render("pages/admin-dashboard");
});

module.exports = router;