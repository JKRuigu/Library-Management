const mongoose = require('mongoose');

//User Schema
var UserSchema = mongoose.Schema({
	adminNo:{
		type:String,
		required: true
	},
	studentName:{
		required: true,
		type:String
	},
	form:{
		required: true,
		type:String
	},
	stream:{
		required: true,
		type:String
	},
  admissionDate: {
	 	type: Date
	}
}, {
	timestamps:true
});

var User = module.exports = mongoose.model('User',UserSchema);

module.exports.createUser = function (newUser,callback) {
	newUser.save(callback);
}
