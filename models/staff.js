const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User Schema
var StaffSchema = mongoose.Schema({
	username: {
		type: String
	},
	password: {
		type: String
	}
});

StaffSchema.methods.generateHash = function(password) {
	console.log(password);
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
StaffSchema.methods.validPassword = function(password) {
	console.log(password);
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('Staff', StaffSchema);
