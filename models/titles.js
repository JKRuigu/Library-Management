const mongoose = require('mongoose');

//Title Schema
var TitleSchema = mongoose.Schema({
	bookId:{
		type:String
	},
	bookTitle:{
		type:String,
		unique: true,
		required: true
	},
	bookAuthor:{
		type:String,
		required: true
	},
	bookCategory:{
		required: true,
		type:String
	},
	bookSection:{
		required: true,
		type:String
	},
	bookPublisher:{
		required: true,
		type:String
	},
  numberOfCopies: {
	 	type: String
	}
}, {
	timestamps:true
});

var Title = module.exports = mongoose.model('Title',TitleSchema);

module.exports.createTitle = function (newTitle,callback) {
	newTitle.save(callback);
}
