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
router.post('/staff/registration',(req,res)=>{
    var username = req.body.username;
  	var password = req.body.password;

    // Validation
    	req.checkBody('username', 'Name is required').notEmpty();
    	req.checkBody('password', 'Name is required').notEmpty();

      var errors = req.validationErrors();
      if (errors) {
        res.render('login')
      }else {
        var newStaff = new Staff({
  			username: username,
  			password: password
		});
    Staff.createStaff(newStaff, function(err, user){
			if(err) throw err;
		});
      res.redirect('/');
      }
});

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
router.post('/staff/login', passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	}));


module.exports = router;
