// const mongoose = require("mongoose");
const express = require("express");
// const multer = require("multer");
const path = require("path");
// const formDataModel = require("./schema");
const router = express.Router();
const formData = require("./controller/formData");

router.use("/", formData);

//render file
router.get("/all", (req, res) => {
		res.sendFile(path.join(__dirname + "/showData.html"));
});

router.get("/welcome", (req, res) => {
	res.send("<h1>Welcome to input controller</h1>");
});


module.exports = router;