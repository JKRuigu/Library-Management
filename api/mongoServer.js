const router = require('express').Router();
const User = require('../models/students');
const Title = require('../models/titles');
const Book = require('../models/books');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url ='mongodb://localhost:27017';

//student registration
router.post('/student/register',function (req,res) {
  if (!req.body == '') {
    const {adminNo, studentName, form,stream,admissionDate} = req.body.data;
    var newUser = new User({
      "adminNo": adminNo,
      "studentName":studentName,
      "form":form,
      "stream":stream,
      "admissionDate":admissionDate
    }).save(function(err,student) {
      err ? res.status(404):
      res.status(200).json({student})
    });
  }else {
    res.status(404).json({message:'Empty'})
  }
});

//Book Titles registration
router.post('/book/registration/titles',function (req,res) {
  const {bookTitle, bookAuthor,bookCategory, bookSection,bookPublisher,numberOfCopies} = req.body;
    var newTitle = new Title({
      "bookTitle": bookTitle,
      "bookAuthor":bookAuthor,
      "bookSection":bookSection,
      "bookCategory":bookCategory,
      "bookPublisher":bookPublisher,
      "numberOfCopies":numberOfCopies
    }).save(function(err,data) {
      console.log(data);
      console.log(data._id);
      if (err) {
        console.log(err);
        res.status(404).json({message: "The Book Accession Number is already Taken."});
      }else {
        MongoClient.connect(url).then(client =>{
          let db = client.db('library-react');
          const {_id} = data;
          let n =_id.toString();
          db.collection('titles').update(
            {_id:ObjectId(data._id)},
            { $set:{"bookId":n}}).then( ()=>{
            res.json({status:'ok'});
          }).catch(error => {
            res.status(404).json({message:'The student administration number is already in use.'});
          });
          client.close();
        }).catch( error => {
          res.status(404).json({message:'The student administration number is already in use.'});
        });
      }
    });
});

//Books registration
router.post('/book/registration',(req, res) =>{
  if (!req.body == '') {
    MongoClient.connect(url).then(client =>{
      let db = client.db('library-react');
      const {bookAccession, bookCondition,bookIsbn,bookTitle} = req.body.data;
      db.collection('titles').find({"bookTitle":bookTitle}).toArray((err,data)=>{
        if (err) {
          res.status(404).json({message:"Database Error"})
        }else {
          if (data.length == 0 ) {
            res.status(404).json({message:"Database Error"})
          }else {
            var id = data[0]._id;
            var newBook = new Book({
              "bookAccession":bookAccession,
              "bookCondition":bookCondition,
              "Isbn":bookIsbn,
              "bookCategoryId":id
            }).save(function(err,books) {
              err ? res.status(200).json({message:"Database Error"}) :
              res.status(200).json({books});
            });
          }
        }
      })
    }).catch( error => {
      res.status(404).json({message:'Server Error '});
    });
  }else {
    res.status(404).json({message:'Empty body Error '});
  }
});

router.get('/fetch/students',(req, res) =>{
    MongoClient.connect(url).then(client =>{
      let db = client.db('library-react');
      db.collection('users').find().toArray((err,students)=>{
        res.status(200).json({students});
        client.close();
      })
    }).catch( error => {
      res.status(404).json({message:'Server Error.'});
    });
});

router.get('/fetch/stream',(req, res) =>{
    MongoClient.connect(url).then(client =>{
      let db = client.db('library-react');
      db.collection('streams').find().toArray((err,results)=>{
        let data = results;
        res.status(200).json({data});
        client.close();
      })
    }).catch( error => {
      res.status(404).json({message:'Server Error.'});
    });
});

router.get('/fetch/borrowing/books',  (req, res) =>{
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("library-react");
    dbo.collection('books').aggregate([
      { $lookup:
         {
           from: 'titles',
           localField: 'bookCategoryId',
           foreignField: 'bookId',
           as: 'orderdetails'
         }
       }
     ]).toArray((err, books)=> {
      err ?   res.status(404).json({message:'Unable to fetch data'}):
        res.status(200).json({books});
        db.close();
    });
  });
});

router.put('/student/edit',(req, res) =>{
  if(!req.body == '') {
    const {adminNo, studentName, form, stream, admissionDate,_id} = req.body.data;
    MongoClient.connect(url).then(client =>{
      let db = client.db('library-react');
      db.collection('users').update(
        {_id:ObjectId(_id)},
        { $set:{adminNo, studentName, form, stream, admissionDate }})
        .then(()=>{
          res.status(200).json({data:req.body.data});
      })
      .catch( error => {
        console.log(error);
        res.status(404).json({message:'The book accession number is already in use.'});
      });
    })
  }else {
      res.status(404).json({message:"Send a valid body"});
    }
  });

router.put('/stream/:Id/edit',(req, res) =>{
  let data = req.body[0]
  if(data && req.params.Id) {
    MongoClient.connect(url).then(client =>{
      let db = client.db('library-react');
      const {stream} = data;
      db.collection('streams').update(
        {_id:ObjectId(req.params.Id)},
        { $set:{stream}}).then( ()=>{
          MongoClient.connect(url).then(client =>{
            let db = client.db('library-react');
            db.collection('streams').find().toArray((err,data)=>{
              res.status(200).json({data});
              client.close();
            })
          }).catch( error => {
            console.log(error);
            res.status(404).json({message:'Server Error.'});
          });
        }).catch(error => {
          console.log(error);
          res.status(404).json({message:'The book accession number is already in use.'});
        });
        client.close();
      }).catch( error => {
        console.log(error);
        res.status(404).json({message:'The book accession number is already in use.'});
      });
    } else {
      res.status(404).json({message:"Send a valid body"});
    }
  });

router.put('/book/:bookTitle/edit',(req, res) =>{
  var bodyData = req.body[0];
  var bookId = req.body[0]._id
  var num = req.params.bookTitle;
  var n = num.toString();
  if ( n === '123') {
    var bookTitle = req.body[0].orderdetails[0].bookTitle
  }else {
    var bookTitle = req.params.bookTitle
  }
  if (bodyData && bookTitle  && bookId) {
   MongoClient.connect(url).then(client =>{
     let db = client.db('library-react');
     db.collection('titles').find({bookTitle:bookTitle})
     .toArray((err,data)=>{
       if (err) {
         res.status(404).json({message:'Database Error(final)'})
       }else{
         let n = data[0]._id
         let bookCategoryId = n.toString()
         const {bookAccession,bookCondition,Isbn} = bodyData;
         MongoClient.connect(url).then(client =>{
             let db = client.db('library-react');
             db.collection('books').update(
               {_id:ObjectId(bookId)},
               { $set:{bookAccession, bookCategoryId, bookCondition, Isbn,bookCategoryId}})
             .then(()=>{
               res.status(200).json({message:'Ok'});
                 })
               .catch( error => {
                res.status(404).json({message:'Database Error(final)'});
               });
               client.close();
             })
             .catch(error => {
               res.status(404).json({message:'Database Error'});
             });
             client.close();}
           })
     })
     .catch( error => {
      res.status(404).json({message:error.message});
     });
  }else {
   res.status(404).json({message:"Fill in all the spaces"});
  }

});

router.delete('/student/:studId/delete',  (req, res) =>{
  console.log(req.params.studId);
  MongoClient.connect(url).then(client =>{
    let db = client.db('library-react');
    db.collection('users').deleteOne({_id:ObjectId(req.params.studId)})
    .then(()=>{
      res.status(200).json({data:req.params.studId})
    }).catch(error => {
      res.status(404).json({message:error.message});
    });
    client.close();
  }).catch( error => {
    res.status(404).json({message:error.message});
  });
});

router.delete('/book/:bookId/delete',  (req, res) =>{
  MongoClient.connect(url).then(client =>{
    let db = client.db('library-react');
    db.collection('books').deleteOne({_id:ObjectId(req.params.bookId)}).then( ()=>{
      MongoClient.connect(url).then(client =>{
        let db = client.db('library-react');
        db.collection('books').find().toArray((err,data)=>{
          res.status(200).json({data:data});
          client.close();
        })
      }).catch( error => {
        console.log(error);
        res.status(404).json({message:'Server Error.'});
      });
    }).catch(error => {
      res.status(404).json({message:error.message});
    });
    client.close();
  }).catch( error => {
    res.status(404).json({message:error.message});
  });
});

router.delete('/stream/:streamId/delete',  (req, res) =>{
  MongoClient.connect(url).then(client =>{
    let db = client.db('library-react');
    db.collection('streams').deleteOne({_id:ObjectId(req.params.streamId)}).then( ()=>{
      MongoClient.connect(url).then(client =>{
        let db = client.db('library-react');
        db.collection('streams').find().toArray((err,data)=>{
          res.status(200).json({data:data});
          client.close();
        })
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
});


module.exports = router;
