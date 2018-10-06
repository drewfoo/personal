// require node modules
var express = require('express');
var app = express();

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
