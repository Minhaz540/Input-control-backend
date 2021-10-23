const mongoose = require("mongoose");
const schema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
    email: {
        type: String,
        required: true,
    }
});

const formDataModel = mongoose.model("Form", schema);

module.exports = formDataModel;