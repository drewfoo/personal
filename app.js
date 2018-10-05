// require node modules
var express = require('express');
var app = express();

// set app to use pug view engine and source for static files
app.set('view engine', 'pug');
app.use(express.static('public'));

// beginning of app routing
app.get('/', function(req, res){
  res.render('index', {title : "HEY", message : "IT WORKED!!!"});
});

app.listen(3000);








// var router = require("./router.js");

// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 8080;

// const server = http.createServer((request, response) => {
//  router.home(request,response);
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

// //testing this commit
