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

router.post('/borrow/issue',(req,res) =>{
  const {BookAcc,studId,startDate,deadLine} = req.body.data
  MongoClient.connect(url).then(client =>{
    let db = client.db('library-react');
    db.collection('users')
    .update(
        {_id:ObjectId(studId)},
        { $push :{
          "myBooks":
            {
              "bookAcc":BookAcc,
              "dateIssued":startDate,
              "deadLine":deadLine
            }
        }})
      .then(res =>{
        res.status(200).json({data:req.body.data})
        client.close();
      })
  }).catch( error => {
    console.log(error);
    res.status(404).json({message:error.message});
  });
})

module.exports = router;
