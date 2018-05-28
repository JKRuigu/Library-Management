const mongoose = require('mongoose');

//User Schema
var OverdueSchema = mongoose.Schema({
  studName:{
    required: true,
    type:String
  },
  BookAcc:{
    required: true,
    type:String
  },
  studId:{
    required: true,
    type:String
  },
  bookTitle:{
    required: true,
    type:String
  },
  period:{
    require:true,
    type:String
  }
}, {
	timestamps:true
});

var Overdue = module.exports = mongoose.model('Overdue',OverdueSchema);

module.exports.createOverdue = function (newOverdue,callback) {
	newOverdue.save(callback);
}
