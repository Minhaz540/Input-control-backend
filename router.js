const express = require("express");
const path = require("path");
const router = express.Router();
const formData = require("./formData");

router.use("/", formData);

//render file
router.get("/all", async (req, res) => {
	await res.sendFile(path.join(__dirname + "/showData.html"));
});

router.get("/welcome", (req, res) => {
	res.send("<h1>Welcome to input controller</h1>");
});

module.exports = router;