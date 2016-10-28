var mongoose = require('mongoose'),
	passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
	username: { type: String, index: { unique: true }, lowercase: true, required: true },
	name: { type: String },
	email: { type: String, index: { unique: true }, lowercase: true, required: true }
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);