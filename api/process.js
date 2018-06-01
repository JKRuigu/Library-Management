const router = require('express').Router();
const User = require('../models/students');
const Overdue = require('../models/overdue');
const Title = require('../models/titles');
const Book = require('../models/books');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url ='mongodb://localhost:27017';


router.get('/fetch/overdue',(req, res) =>{
  MongoClient.connect(url).then(client =>{
    let db = client.db('library-react');
    db.collection('overdues').find().toArray((err,data)=>{
      res.status(200).json({data});
      client.close();
    })
  }).catch( error => {
    console.log(error);
    res.status(404).json({message:'Server Error.'});
  });
});

router.post('/borrow/issue',(req,res) =>{
  const {BookAcc,studId,startDate,deadLine} = req.body.data
  let issueOrder = {};
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
      .then(student =>{
        MongoClient.connect(url).then(client =>{
          let db = client.db('library-react');
          db.collection('books').update(
            {bookAccession:BookAcc},
            { $set:{
              isAvailable:false
            }}, { new: true }
          )
          .then(book=>{
            MongoClient.connect(url).then(client =>{
              let db = client.db('library-react');
              db.collection('users').find({_id:ObjectId(studId)}).toArray((err,data)=>{
                issueOrder.user = data;
                client.close();
              })
              db.collection('books').aggregate([
                { $lookup:
                   {
                     from: 'titles',
                     localField: 'bookCategoryId',
                     foreignField: 'bookId',
                     as: 'orderdetails'
                   }
                 }, {
                   $match: {
                     bookAccession: BookAcc
                   }
                 }
               ]).toArray((err, book)=> {
                 issueOrder.book = book;
                  client.close();
                  res.status(200).json({issueOrder});
              });
            }).catch( error => {
              res.status(404).json({message:'Server Error.'});
            });
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

router.post('/student/overdue/add', (req,res)=> {
  const {studId, studName, days,bookAcc,bookTitleId,id} = req.body.data;
  let chargeResults = {};
  if (!req.body == '') {
    MongoClient.connect(url).then(client =>{
      let db = client.db('library-react');
      db.collection('titles').find({_id:ObjectId(bookTitleId)}).toArray((err,data)=>{
        if (data) {
          var newOverdue = new Overdue({
            "studId": studId,
            "studName":studName,
            "bookTitle":data[0].bookTitle,
            "BookAcc":bookAcc,
            "period":days
          }).save((err,data)=>{
            if (err) {
              console.log(err);
            }else {
              chargeResults.overdue= data;
              MongoClient.connect(url).then(client =>{
                let db = client.db('library-react');
                db.collection('books').update(
                  {bookAccession:id},
                  { $set:{
                    isAvailable:true
                  }}
                ).then(()=>{
                  db.collection('books').aggregate([
                    { $lookup:
                       {
                         from: 'titles',
                         localField: 'bookCategoryId',
                         foreignField: 'bookId',
                         as: 'orderdetails'
                       }
                     }, {
                       $match: {
                         bookAccession: id
                       }
                     }
                   ]).toArray((err, book)=> {
                     chargeResults.book= book;
                    db.collection('users').update(
                       {_id:ObjectId(studId)},
                       { $pull: { myBooks: { bookAcc: id} } },
                       { multi: true }).then(()=>{
                         db.collection('users').find({_id:ObjectId(studId)}).toArray((err,data)=>{
                           chargeResults.user = data;
                           res.status(200).json({chargeResults});
                           client.close();
                         })
                       });
                  });
                });
              }).catch( error => {
                res.status(404).json({message:'Server Error.'});
              });
            }
          });
        }
        client.close();
      })
    }).catch( error => {
      res.status(404).json({message:'Server Error.'});
    });
  }else {
    res.status(404).json({message:'Empty'})
  }
});

router.put('/return/book5',(req, response) =>{
  const{studId,id} = req.body.data
  let myResults={};
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("library-react");
    var data = req.body.data

    dbo.collection('users')
    .update(
      {_id:ObjectId(studId)},
      { $pull: { myBooks: { bookAcc: id} } },
      { multi: true },

      function (err,result) {
        if (err) throw err;

        dbo.collection("books").update(
          {bookAccession:id},
          { $set:{
            isAvailable:true
          }},
          function (err,res) {
            if (err) throw err;
            dbo.collection("books").find().toArray(function(err, data) {
              db.close();
            });
          }
        )
    });
  });
});

router.put('/return/book',(req, res) =>{
  const{studId,id} = req.body.data
  let myResults={};
  MongoClient.connect(url).then(client =>{
    let db = client.db('library-react');
    db.collection('books').update(
      {bookAccession:id},
      { $set:{
        isAvailable:true
      }}).then(()=>{
        db.collection('books').aggregate([
          { $lookup:
             {
               from: 'titles',
               localField: 'bookCategoryId',
               foreignField: 'bookId',
               as: 'orderdetails'
             }
           }, {
             $match: {
               bookAccession: id
             }
           }
         ]).toArray((err, book)=> {
           console.log(book);
           myResults.book= book;
          db.collection('users').update(
             {_id:ObjectId(studId)},
             { $pull: { myBooks: { bookAcc: id} } },
             { multi: true }).then(()=>{
               db.collection('users').find({_id:ObjectId(studId)}).toArray((err,data)=>{
                 console.log(data);
                 myResults.user = data;
                 res.status(200).json({myResults});
                 client.close();
               })
             });
        });
      });
  }).catch( error => {
    console.log(error);
    res.status(404).json({message:'Server Error.'});
  });
});

module.exports = router;
