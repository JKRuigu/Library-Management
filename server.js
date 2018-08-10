const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoServer = require('./api/mongoServer');
const serverProcess = require('./api/process');
const Config = require('./config/settings');
const loginAuth = require('./api/login');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const session = require('express-session');
// const flash = require('connect-flash');

const server = express();

mongoose.connect('mongodb://localhost/library-react',()=>{
  console.log('connected to mongodb');
});
var db = mongoose.connection;
server.use(cors())
//bodyParser
server.use(cookieParser());
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
// server.use(session({
// 		secret: 'rtujwqre566577lkjjhggf/*/*~',
// 		saveUninitialized: true,
// 		resave: true
// 	}));

// // Express Validator
// server.use(expressValidator({
//   errorFormatter: function(param, msg, value) {
//       var namespace = param.split('.')
//       , root    = namespace.shift()
//       , formParam = root;
//
//     while(namespace.length) {
//       formParam += '[' + namespace.shift() + ']';
//     }
//     return {
//       param : formParam,
//       msg   : msg,
//       value : value
//     };
//   }
// }));


server.on('ready', function() {
  express();
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    autoHideMenuBar: true,
    useContentSize: true,
    resizable: false,
  });
  mainWindow.loadURL('http://localhost:5000/');
  mainWindow.focus();

});
server.use(passport.initialize());
server.use(passport.session()); // persistent login sessions
// server.use(flash()); // use connect-flash for flash messages stored in session

// // Global Vars
// server.use(function (req, res, next) {
//   res.locals.success_msg = req.flash('success_msg');
//   res.locals.error_msg = req.flash('error_msg');
//   res.locals.error = req.flash('error');
//   res.locals.user = req.user || null;
//   next();
// });
const port = 8080 || process.env.PORT ;

// Serve static assets if in production
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('build'));
//
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname,'build', 'index.html'));
//   });
// }
// app.use(express.static(path.join(__dirname, 'public')));
// server.use(cors({ origin: 'http://localhost:8080' , credentials :  true}));

server.use('/login',loginAuth);
server.use('/api',mongoServer);
server.use('/settings',Config);
server.use('/process',serverProcess);

//Serve the react app files
server.use(express.static(__dirname + '/build'));

server.listen(port, () => console.log(`Listening on port ${port}`));
