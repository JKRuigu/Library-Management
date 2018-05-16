const mongoose = require('mongoose');

//User Schema
var StreamSchema = mongoose.Schema({
	stream:{
		unique: true,
		required: true,
		type:String
	}
});

var Stream = module.exports = mongoose.model('Stream',StreamSchema);

module.exports.createStream = function (newStream,callback) {
	console.log('hey');
	console.log(newStream);
	newStream.save(callback);
}
