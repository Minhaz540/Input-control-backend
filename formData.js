const express = require("express");
const formData = express.Router();
const multer = require("multer");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const path = require("path");
const { unlink } = require("fs");
const FormDataModel = require("./schema");

dotenv.config();
formData.use(express.json());
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
			res.render("allData", { data });
		}
	});
});

formData.post("/", upload.single("profile"), async (req, res) => {
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
	// let hashedPassword;
	// bcrypt
	// 	.hash(req.body.password, 10)
	// 	.then(function (result) {
	// 		hashedPassword = result;
	// 	})
	// 	.catch(function (err) {
	// 		console.error(err);
	// 	});
	const newForm = new FormDataModel({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword,
		age: req.body.age,
		imgFileName: uploadFileName,
	});
	newForm.save((err) => {
		if (err) {
			res.status(500).send("Internal server error: " + err);
			// deleting unused file
			unlink(
				path.join(__dirname, `/public/uploaded_file/${uploadFileName}`),
				(err) => {
					if (err) console.error(err);
				}
			);
		} else {
			res.sendFile(path.join(__dirname, "/showData.html"), (err) => {
				if (err) {
					console.error(err);
				} else {
					console.log("Sent:", uploadFileName);
				}
			});
		}
	});
});

module.exports = formData;
