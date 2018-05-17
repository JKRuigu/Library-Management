const router = require('express').Router();
const User = require('../models/students');
const Title = require('../models/titles');
const Stream = require('../models/stream');
const Book = require('../models/books');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url ='mongodb://localhost:27017';

router.get('/books/titles',(req,res) =>{
  MongoClient.connect(url).then(client =>{
    let db = client.db('library-react');
    db.collection('titles').find({}).toArray((err,data)=>{
      res.status(200).json({data});
      client.close();
    })
  }).catch( error => {
    res.status(404).json({message:'Server Error.'});
  });
});

router.post('/add/classes', (req,res)=> {
  if (req.body) {
    const {stream} = req.body;
    console.log('hey');
    console.log(stream);
    var newStream = new Stream({
      "stream": stream
    }).save(function(err,data) {
      err ? res.status(404).json({message: "The stream already exists."}) :res.status(200).json({message:"Ok"})
    });
  }else {
    console.log('error');
  }
});

module.exports = router;
