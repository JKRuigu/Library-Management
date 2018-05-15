const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User Schema
var StaffSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	}
});

var Staff = module.exports = mongoose.model('Staff', StaffSchema);

module.exports.createStaff = function(newStaff, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newStaff.password, salt, function(err, hash) {
	        newStaff.password = hash;
	        newStaff.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	Staff.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	Staff.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
