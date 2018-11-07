var express = require('express');
var router = express.Router();

//need to require any mongoose schemas
var User = require('../models/user');


// Homepage Route
router.get('/', function(req, res){
    res.render('home', {title : "HEY", message : "This is the main index.js page"});
});

// Test Route
router.get('/index', function(req, res){
    res.render('index', {title : "HEY", message : "This is the main index.js page"});
});

// Registration Route (GET)
router.get('/register', function(req,res,next){
    res.render('register', {title : "Sign Up"} );
});

// Registration Route (POST)
router.post('/register', function(req,res,next){
    // validation
    if (req.body.email &&
        req.body.name &&
        req.body.favoriteBook &&
        req.body.password &&
        req.body.confirmPassword) {      
            //confirm that user typed in the same password fields
            if ( req.body.password !== req.body.confirmPassword ) {
                var err = new Error('Passwords do not match.');
                err.status = 400;
                return next(err);
            }

            // create object with the form input to be stored as a document in mongo
            var userData = {
                email : req.body.email,
                name: req.body.name,
                favoriteBook: req.body.favoriteBook,
                password: req.body.password
            };

            // use schema's 'create' method to insert document into mongo
            // insert into mongo, schema's create method to insert document into mongo
            // User is from our schema file
            User.create(userData, function(error,user) {
                if (error) {
                    return next(error)
                } else {
                    return res.redirect('/profile');
                }
            });

        } else {
            var err = new Error('All feilds required.');
            err.status = 400;
            return next(err) 
        }
});

//Profile Route
router.get('/profile', function(req,res){
    res.render('profile', { title : "Profile"});
});

// Sitemap Route
router.get('/sitemap', function(req, res){
    res.render('sitemap', {title : "Sitemap"});
});

module.exports = router;