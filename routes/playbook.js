const express = require('express');

const router = express.Router();
const User = require('../models/user')
const Feedback = require('../models/user')
const Player = require('../models/play')
const Play = require('../models/play')
const Detail = require('../models/play')
const mid = require('../middleware');

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
        console.log(play);
    })
});


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