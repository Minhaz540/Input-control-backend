const mongoose = require("mongoose");
const schema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		require: true,
	},
	imgFileName: {
		type: String,
		require: true,
	},
});

const formDataModel = mongoose.model("Form", schema);

module.exports = formDataModel;
