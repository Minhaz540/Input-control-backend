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
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

mongoose
	.connect(DB_CONNECTION_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Database connection established...");
	})
	.catch((err) => {
		console.error("Error is: ", err);
	});

const connection = mongoose.connection;
connection.on("connected", () => {
	console.log("<Database is connected>");
});
connection.on("disconnected", () => {
	console.log("<Database disconnected>");
});

app.get("/", (req, res) => {
	res.send("All ok");
});

app.use("/form", router);

app.listen(PORT || 3000, () => {
	console.log(`Server running at http://${HOSTNAME}:${PORT}`);
});
