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
        MongoClient.connect(url).then(client =>{
          let db = client.db('library-react');
          db.collection('books').update(
            {bookAccession:BookAcc},
            { $set:{
              isAvailable:false
            }}
          )
          .then(()=>{
            res.status(200).json({data:BookAcc})
          }).catch(error => {
            res.status(404).json({message:error.message});
          });
          client.close();
        }).catch( error => {
          res.status(404).json({message:error.message});
        });
        client.close();
      })
  }).catch( error => {
    console.log(error);
    res.status(404).json({message:error.message});
  });
})

router.put('/return/book',(req, res) =>{
  console.log(req.body.data);
  const{studId,id} = req.body.data

  MongoClient.connect(url).then(client =>{
      let db = client.db('library-react');
      db.collection('users')
      .update(
        {_id:ObjectId(studId)},
        { $pull: { myBooks: { bookAcc: id} } },
        { multi: true }
      )
      .then( ()=>{
        MongoClient.connect(url).then(client =>{
            let db = client.db('library-react');
            db.collection('books')
            .update(
              {bookAccession:id},
              { $set:{
                isAvailable:true
              }}
            )
            .then( ()=>{
              console.log('success');
              res.json({status:'ok'});
            }).catch(error => {
              res.status(404).json({message:error.message});
            });
            client.close();
          }).catch( error => {
            res.status(404).json({message:error.message});
          });
      }).catch(error => {
        res.status(404).json({message:error.message});
      });
      client.close();
    }).catch( error => {
      res.status(404).json({message:error.message});
    });
});
module.exports = router;
