// const mongoose = require("mongoose");
const express = require("express");
const multer = require("multer");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");
const formData = express.Router();

dotenv.config();
const { UPLOAD_FOLDER } = process.env;

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, UPLOAD_FOLDER);
	},
	filename: (req, file, callback) => {
		let extName = path.extname(file.originalname);
		let fileName =
			file.originalname
				.replace(extName, "")
				.toLowerCase()
				.split(" ")
				.join("-") +
			"-" +
			Date.now();
		callback(null, fileName + extName);
	},
});

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 10000000,
	},
	fileFilter: (req, file, callback) => {
		if (file.fieldname === "profile") {
			if (
				file.mimetype === "image/png" ||
				file.mimetype === "image/jpg" ||
				file.mimetype === "image/jpeg"
			) {
				callback(null, true);
			} else {
				callback(
					new Error("Only png, jpg and jpeg formats are acceptable")
				);
			}
		} else {
			callback(new Error("Upload failed"));
		}
	},
});

formData.get("/", (req, res) => {
	res.send('<img src="201-35-3001-1634970387946.png">');
});

formData.post("/", upload.single("profile"), (req, res, next) => {
	let options = {
		root: path.join(__dirname),
	};
	let fileName = "showData.html";
	res.sendFile(fileName, options, function (err) {
		if (err) {
			next(err);
		} else {
			next();
		}
	});
});

module.exports = formData;
