// require node modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
// this calls connect mongo and allows it access to the session
const MongoStore = require('connect-mongo')(session);

const app = express();

// Want to add - chalk, morgan, and debug NPM modules to learn how to debug


// MongoDB Connection
const url = 'mongodb://localhost:27017/Personal';
mongoose.connect(url);
const db = mongoose.connection;
// Mongo Error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (){
  console.log('"Connected Successfully to the Server');
});

// Use Sessions for Tracking Logins
// Will need to eventually change the sesssion store using mongo db
// set a new mongo  store for the session storage middleware
app.use(session({
  secret: 'password',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// make another middleware for the User ID available to our templates
// locals in the response is something views can access
app.use(function (req, res, next) {
  res.locals.currentUser = req.session.userId;
  next();
})

// Parse Incoming Requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve Static Files and View Engine Setup
app.use(express.static('assets'));
app.set('view engine', 'pug');
app.set('views',[__dirname + '/views/', __dirname + '/views/playbook']);

// Import and Use Route Files

const mainRoutes = require('./routes');
const playbookRoutes = require('./routes/playbook');
const siteMap = require('./routes/sitemap');

app.use(mainRoutes);
app.use(playbookRoutes);
app.use(siteMap);

// Catch 404 Errors and Forward to Error Handler
app.use(function(req, res, next) {
  let err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// Error Handler and Define as the Last App.Use Callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// server information
app.listen(8000, function() {
  console.log('App Listening to Port 8000');
});
