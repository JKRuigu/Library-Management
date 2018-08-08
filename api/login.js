const router = require('express').Router();
const Staff = require('../models/staff');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Staff.getUserById(id, function(err, user) {
    done(err, user);
  });
});

//Staff registration
// router.post('/staff/registration',(req,res)=>{
//     var username = req.body.username;
//   	var password = req.body.password;
//
//     // Validation
//     	req.checkBody('username', 'Name is required').notEmpty();
//     	req.checkBody('password', 'Name is required').notEmpty();
//
//       var errors = req.validationErrors();
//       if (errors) {
//         res.render('login')
//       }else {
//         var newStaff = new Staff({
//   			username: username,
//   			password: password
// 		});
//     Staff.createStaff(newStaff, function(err, user){
// 			if(err) throw err;
// 		});
//       res.redirect('/');
//       }
// });

// router.post('/staff/registration',(req,res) =>{
//   const {username,password} = req.body;
//   console.log(req.body);
//   // res.status(200).json({message:"Ok"})
//   Staff.find({username: username}, (err, previousUsers) => {
//     console.log(previousUsers);
//     console.log(err);
//     if (err) {
//       return res.send({
//         success: false,
//         message: 'Error: Server error'
//       });
//     } else if (previousUsers.length > 0) {
//       return res.send({
//         success: false,
//         message: 'Error: Account already exist.'
//       });
//     }
//     // Save the new user
//     const newStaff = new Staff();
//     newStaff.username = username;
//     newStaff.password = newStaff.generateHash(password);
//     newStaff.save((err, user) => {
//       if (err) {
//         return res.send({
//           success: false,
//           message: 'Error: Server error'
//         });
//       }
//       return res.send({
//         success: true,
//         message: 'Signed up'
//       });
//     });
//   });
// });

passport.use(new LocalStrategy(
  function(username, password, done) {
   Staff.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	Staff.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
 });
}));

//Staff Login
router.post('/staff/login2', passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
}));

router.post('/staff/login',(req,res) =>{
  const {username,password} = req.body;
  Staff.find({username: username}, (err, users) => {
    if (err) {
      console.log('err 2:', err);
      res.status(404).json({data:'false'});
    }
    if (users.length != 1) {
      res.status(404).json({data:'false'});
    }
    const user = users[0];
    if (!user.validPassword(password)) {
      res.status(404).json({data:'false'});
    }else {
      console.log(user);
      res.status(200).json({data:'true'})
    }

  });
});

module.exports = router;
