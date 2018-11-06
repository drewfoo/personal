var express = require('express');
var router = express.Router();

// Homepage Route
router.get('/', function(req, res){
    res.render('index', {title : "HEY", message : "This is the main index.js page"});
});

// Registration Route (GET)
router.get('/register', function(req,res,next){
    res.render('register', {title : "Sign Up"} );
});

router.post('/register', function(req,res,next){
    res.send('CONGRATS ON SIGNING UP!!!!');
});

// Registration Route (POST)

// Sitemap Route
router.get('/sitemap', function(req, res){
    res.render('sitemap', {title : "Sitemap"});
});

module.exports = router;
