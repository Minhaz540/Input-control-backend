const express = require("express");
const login = express();
const mongoose = require("mongoose");
const path = require("path");
const userModel = require("../models/schema");

login.use(express.json());
login.use(express.urlencoded({ extended: true }));

login.post("/loginDetails", (req, res) => {
	// userSchema.find({})
	console.log(req.body.password);
	res.end();
});

login.get("/login", (req, res) => {
	res.sendFile(path.join(__dirname, "../html/login.html"));
});

module.exports = login;
