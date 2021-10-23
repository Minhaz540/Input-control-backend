const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./router");
const app = express();

dotenv.config();
const { PORT, HOSTNAME, DB_CONNECTION_STRING } = process.env;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
	.connect(DB_CONNECTION_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Database connection established...");
	})
	.catch((err) => {
		console.log("Error is: ", err);
	});

app.get("/", async (req, res) => {
	res.send("All ok");
})

app.use("/form", router);

app.listen(PORT || 3000, () => {
	console.log(`Server running at http://${HOSTNAME}:${PORT}`);
});
