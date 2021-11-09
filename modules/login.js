const express = require("express");
const login = express();
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcrypt");
const userModel = require("../models/schema");

login.use(express.json());
login.use(express.urlencoded({ extended: true }));

login.post("/loginDetails", async (req, res) => {
	const { email, password } = req.body;
	const foundUserData = await userModel.find({ email: email });
	if (foundUserData[0] != undefined) {
		bcrypt.compare(password, foundUserData[0].password, (err, result) => {
			if (err) {
				res.send("Login failed! Invalid password or email");
			} else {
				res.send("Login successful");
			}
		});
	} else {
		res.send("Login failed! Internal server error");
	}
});

login.get("/login", (req, res) => {
	res.sendFile(path.join(__dirname, "../html/login.html"));
});

module.exports = login;
