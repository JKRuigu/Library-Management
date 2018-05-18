const mongoose = require('mongoose');

//User Schema
var BookSchema = mongoose.Schema({
	bookAccession:{
		type:String,
		unique: true,
		required: true
	},
	bookCondition:{
		type:String,
		required: true
	},
	isavailbe:{
		type: Boolean,
		 default: true
	},
	Isbn:{
		required: true,
		type:String
	},
	bookCategoryId:{
		required: true,
		type:String
	},
}, {
	timestamps:true
});

var Book = module.exports = mongoose.model('Book',BookSchema);

module.exports.createBook = function (newBook,callback) {
	newBook.save(callback);
}
