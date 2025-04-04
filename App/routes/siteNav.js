const express = require("express");
const router = express.Router();


router.get("/", async (req, res) => {
    res.render("pages/index")
});

router.get("/index", async (req, res) => {
    res.render("pages/index")
});

router.get("/index/tracking", async (req, res) => {
    res.render("pages/tracking")
});


router.get("/auth/customer-login", async(req, res) => {
    res.render("pages/login");
});

router.get("/service", async (req, res) => {
    res.render("pages/service")
});

router.get("/about", async (req, res) => {
    res.render("pages/about")
});

router.get("/contact", async (req, res) => {
    res.render("pages/contact")
});



router.get("/dashboard", async(req, res) => {
    req.session.message = {
        status: "Success",
        type: "success",
        message: "Rendered dashboard successfully"
    }
    res.render("pages/dashboard");
})

module.exports = router;