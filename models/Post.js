var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
	title: { type: String, required: true },
	image: { type: String, required: true },
	content: { type: String, required: true },
	category: { type: String, required: false },
	author: {
		id: { type:mongoose.Schema.Types.ObjectId, ref: 'User' },
		username: { type: String, required: true }
	},
	created_at: { type: String, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
