var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('index', {title : "HEY", message : "This is the main index.js page"});
});

module.exports = router;
