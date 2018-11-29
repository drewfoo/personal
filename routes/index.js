var express = require('express');
var router = express.Router();
var User = require('../models/user')
var Feedback = require('../models/user')
var Player = require('../models/play')
var Play = require('../models/play')
var Detail = require('../models/play')
var mid = require('../middleware');


// GET /profile
router.get('/profile', mid.requiresLogIn, function(req, res, next) {
    // if (! req.session.userId ) {
    //   var err = new Error("You are not authorized to view this page.");
    //   err.status = 403;
    //   return next(err);
    // }
    User.findById(req.session.userId, function (error, user){
          if (error) {
            return next(error);
          } else {
            let userFeedback = [];
            for (i = 0 ; i < user.feedback.length ; i++ ){
                userFeedback.push(user.feedback[i]);
            }
            console.log(user);
            // console.log(userFeedback);
            return res.render('profile', { title: 'Profile', name: user.name, favorite: user.favoriteBook, feedback : userFeedback });
      }
    });
});

// GET /logout
router.get('/logout', function(req,res,next) {
    if (req.session) {
        //delete session object
        req.session.destroy( function(err) {
            if(err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

// GET /login
router.get('/login', mid.loggedOut, function(req,res,next){
    res.render('login', { title : 'Login Page'});
});

// POST /login
router.post('/login', function(req, res, next) {
    // req.session.name = 'test_username';
    if (req.body.email && req.body.password) {
        User.authenticate(req.body.email, req.body.password, function (error, user) {
        if (error || !user) {
            var err = new Error('Wrong email or password.');
            err.status = 401;
            return next(err);
        }  else {
            req.session.userId = user._id;
            return res.redirect('/profile');
        }
        });
    } else {
        var err = new Error('Email and password are required.');
        err.status = 401;
        return next(err);
    }
});

// // GET /feedback
router.get('/feedback', mid.requiresLogIn, function(req, res, next){
    res.render('feedback', { title: "feedback form"}) ;
});

// // POST /feedback
router.post('/feedback', function(req, res, next){
    let date = new Date();

    Feedback.findOneAndUpdate({_id : req.session.userId }, 
    { $push : { feedback : { summary : req.body.summary, note : req.body.note, createdDate : date}}},
    function(error, results){
        if (error) {
            return next(error)
        } else {
            return res.redirect('/profile');
        }
    });
    });

// GET /register
// setting middleware to see if they are logged in or not
router.get('/register', mid.loggedOut, function(req,res,next){
    res.render('register', {title : "Sign Up"} );
});

// POST /register
router.post('/register', function(req,res,next){
    // validation
    if (req.body.email &&
        req.body.name &&
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
                password: req.body.password
            };

            // use schema's 'create' method to insert document into mongo
            // insert into mongo, schema's create method to insert document into mongo
            // User is from our schema file
            User.create(userData, function(error,user) {
                if (error) {
                    return next(error)
                } else {
                    req.session.userId = user._id;
                    return res.redirect('/profile');
                }
            });

        } else {
            var err = new Error('All feilds required.');
            err.status = 400;
            return next(err) 
        }
});

// Homepage Route
router.get('/', function(req, res){
    res.render('index', {title : "HEY", message : "This is the main index.js page"});
});

// Playbook Route 
router.get('/playbook/:name', function(req,res,next){
    Play.findOne( { name : req.params.name }, function (error, play) {
        if (error) {
            return next(error);
          } else {
            let list = [];
            for (i = 0 ; i < play.detail.length ; i++ ){
                list.push(play.detail[i]);
            }
            console.log(list);
            // console.log(userFeedback);
            return res.render('playbook', { title: 'Playbook', list : list });
        }
    });
});

// TEST Route
router.get('/test', function(req,res,next){
    Play.findOne( { name : "overview" }).populate('players').
    exec(function (err, play){
        if (err) return next(err);
        console.log(play.players[0].name);
    })
});

// GET /logout
router.get('/logout', function(req,res,next) {
if (req.session) {
    //delete session object
    req.session.destroy( function(err) {
        if(err) {
            return next(err);
        } else {
            return res.redirect('/');
        }
    });
}
});

// Sitemap Route
router.get('/sitemap', mid.requiresLogIn, function(req, res) {
    res.render('sitemap', {title : "Sitemap"});
});

module.exports = router;


