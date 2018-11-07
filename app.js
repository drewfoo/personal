// require node modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

// MongoDB Connection
var url = 'mongodb://localhost:27017/Personal';
mongoose.connect(url);
var db = mongoose.connection;
// Mongo Error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (){
  console.log('"Connected Successfully to the Server');
})

// Parse Incoming Requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve Static Files and View Engine Setup
app.use(express.static('public'));
app.set('view engine', 'pug');

// Import and Use Route Files

var mainRoutes  = require('./routes')
var secondRoutes = require('./routes/next')
var siteMap = require('./routes/sitemap')

app.use(mainRoutes);
app.use(secondRoutes);
app.use(siteMap);

// Catch 404 Errors and Forward to Error Handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
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
