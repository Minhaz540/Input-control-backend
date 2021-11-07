const express = require("express");
const router = express.Router();
const app = express();
const path = require("path");
const editFormData = require("./editFormData");
const formData = require("./formData");
const login = require("./login");

app.set("view engine", "ejs");

router.use("/", formData);
router.use("/", editFormData);
// checking for matching and the login process
router.use("/", login);

//render file
router.get("/all", (req, res) => {
	res.sendFile(path.join(__dirname + "/showData.html"));
});

router.get("/welcome", (req, res) => {
	res.send("<h1>Welcome to input controller</h1>");
});

module.exports = router;
