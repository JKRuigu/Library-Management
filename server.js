const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoServer = require('./api/mongoServer');
const Config = require('./config/settings');
const loginAuth = require('./api/login');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const session = require('express-session');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const server = express();

mongoose.connect('mongodb://localhost/library-react',()=>{
  console.log('connected to mongodb');
});
var db = mongoose.connection;
//bodyParser
server.use(cookieParser());
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
server.use(session({
		secret: 'rtujwqre566577lkjjhggf/*/*~',
		saveUninitialized: true,
		resave: true
	}));

// Express Validator
server.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


server.use(passport.initialize());
server.use(passport.session()); // persistent login sessions
server.use(flash()); // use connect-flash for flash messages stored in session

// Global Vars
server.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

const port = 5000 || process.env.PORT ;

server.use('/api',loginAuth);
server.use('/api',mongoServer);
server.use('/settings',Config);

server.listen(port, () => console.log(`Listening on port ${port}`));
