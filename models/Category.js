var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
	name: { type: String, required: true, index: { unique: true } }
});

module.exports = mongoose.model('Category', categorySchema);