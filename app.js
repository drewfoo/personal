// require node modules
var express = require('express');
var app = express();

// require mongo DB configuration
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/Personal';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db.close();
});

// set app to use pug view engine and source for static files
app.set('view engine', 'pug');
app.use(express.static('public'));

// import and use new routes file

var mainRoutes  = require('./routes')
var secondRoutes = require('./routes/next')

app.use(mainRoutes);
app.use(secondRoutes);

// server information
app.listen(8000);
