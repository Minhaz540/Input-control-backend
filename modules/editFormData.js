const express = require("express");
const editFormData = express.Router();
const path = require("path");
const FormDataModel = require("../models/schema");


editFormData.get("/edit", (req, res) => {
	res.render("editProfileInfo");
});

editFormData.put("/edit", (req, res) => {
	res.send("Hello World");
});

module.exports = editFormData;
