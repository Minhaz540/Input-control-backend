const mongoose = require("mongoose");
const express = require("express");
const multer = require("multer");
const dotenv = require("dotenv");
const path = require("path");
const FormDataModel = require("./schema");
const formData = express.Router();

dotenv.config();
const { UPLOAD_FOLDER } = process.env;
let uploadFileName;

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
		uploadFileName = fileName + extName;
		callback(null, uploadFileName);
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

//save formData into database

formData.get("/", (req, res) => {
	FormDataModel.find({}, (err, data) => {
		if (err) {
			res.status(500).json({
				error: "There was a server side error while showing data",
			});
		} else {
			res.render("allData", { data, uploadFileName });
		}
	});
});

formData.post("/", upload.single("profile"), (req, res, next) => {
	let options = {
		root: path.join(__dirname),
	};

	const newForm = new FormDataModel(req.body);
	newForm.save((err) => {
		if (err) {
			res.status(500).json({
				error: "Internal Server Error",
			});
		} else {
			let fileName = "showData.html";
			res.sendFile(fileName, options, function (err) {
				if (err) {
					next(err);
				} else {
					next();
				}
			});
		}
	});
});

module.exports = formData;
