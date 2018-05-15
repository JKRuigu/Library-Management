const router = require('express').Router();
const User = require('../models/students');
const Title = require('../models/titles');
const Book = require('../models/books');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url ='mongodb://localhost:27017';

router.get('/books/titles',(req,res) =>{
  MongoClient.connect(url).then(client =>{
    let db = client.db('library-react');
    db.collection('titles').find({}).toArray((err,results)=>{
      console.log(results);
      let data = results;
      res.status(200).json({data});
      client.close();
    })
  }).catch( error => {
    res.status(404).json({message:'Server Error.'});
  });
});

module.exports = router;
