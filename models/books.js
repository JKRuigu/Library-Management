const mongoose = require('mongoose');

//User Schema
var BookSchema = mongoose.Schema({
	bookAccession:{
		type:String,
		required: true
	},
	bookCondition:{
		type:String,
		required: true
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
