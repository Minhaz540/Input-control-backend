const express = require("express");
const router = express.Router();
const path = require("path");
const formData = require("./formData");

router.use("/", formData);

//render file
router.get("/all", (req, res) => {
	res.sendFile(path.join(__dirname + "/showData.html"));
});

router.get("/login", (req, res) => {
	res.sendFile(path.join(__dirname + "/login.html"));
});

router.get("/welcome", (req, res) => {
	res.send("<h1>Welcome to input controller</h1>");
});

module.exports = router;
