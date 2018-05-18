const router = require('express').Router();
const User = require('../models/students');
const Title = require('../models/titles');
const Book = require('../models/books');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url ='mongodb://localhost:27017';

router.get('/mongodb/test',(req,res)=>{
  res.status(200).json({message:"Ok"})
})

router.post('/borrow/:BookAcc/issue',(req,res) =>{
  const {adminNo} = req.body
  MongoClient.connect(url).then(client =>{
    let db = client.db('library-react');
    db.collection('users')
    .update(
        {_id:ObjectId(adminNo)},
        { $push :{
          "myBooks":[
            {"bookAcc":req.params.Book}
          ]
        }})

      .then(() =>{
        res.status(200).json({message:"Ok"})
        client.close();
      })
  }).catch( error => {
    console.log(error);
    res.status(404).json({message:'Server Error.'});
  });
})

module.exports = router;
