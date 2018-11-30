const express = require('express');

const router = express.Router();
const Player = require('../models/player')
const Playbook = require('../models/playbook')
const Detail = require('../models/playbook')
const mid = require('../middleware');

// Playbook Route
router.get('/playbook/:name', function(req,res,next){
	Playbook.findOne( { name : req.params.name } ).populate('players').
    exec(function (error, playbook) {
      if (error) {
        return next(error);
      } else {
        let playbookList = [];
        let playerList = [];
        for (i = 0 ; i < playbook.detail.length ; i++ ){
          playbookList.push(playbook.detail[i]);}
        for (i = 0 ; i < playbook.players.length ; i++ ){
          playerList.push(playbook.players[i]);   
        }
        console.log(playbook);
        console.log(playbookList);
        console.log(playerList);
        return res.render('playbook', { title: 'Playbook', 
            name: playbook.name,
            heading: playbook.heading,
            summary: playbook.summary,
            playbooklist : playbookList,
            playerlist : playerList});
    }
})
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