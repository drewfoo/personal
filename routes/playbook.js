var express = require('express');
var router = express.Router();
var User = require('../models/user')
var mid = require('../middleware');


// GET Teams
router.get('/teams', function(req,res,next){
    res.render('Teams', {title : 'Teams'});
});

// GET Sprint
router.get('/sprint', function(req,res,next){
    res.render('Sprint', {title : 'Sprint'});
});

// GET Tools
router.get('/tools', function(req,res,next){
    res.render('Tools', {title : 'Tools'});
});

// GET Backlog
router.get('/backlog', function(req,res,next){
    res.render('Backlog', {title : 'Backlog'});
});

// GET Delivery
router.get('/delivery', function(req,res,next){
    res.render('Delivery', {title : 'Delivery'});
});

// GET Artifacts
router.get('/artifacts', function(req,res,next){
    res.render('Artifacts', {title : 'Artifacts'});
});


module.exports = router;