const express = require('express');

const router = express.Router();
const Player = require('../models/player');
const PlayDetail = require('../models/play');
const Play = require('../models/play');
// const Reference = require('../models/playbook');
const Faq = require('../models/playbook');
const Section = require('../models/playbook');
const Playbook = require('../models/playbook');
const mid = require('../middleware');

// Playbook Route
router.get('/playbook/:key', mid.requiresLogIn, (req, res, next) => {
	Playbook.findOne( { key : req.params.key } )
	.populate('plays').
    exec ( (error, playbook) => {
      if (error) {
        return next(error);
      } else { 
        let sectionContent= [];
        let references= [];
        let faq= [];
        let plays= [];
        for ( i = 0 ; i < playbook.section.length ; i++){
            sectionContent.push({
                "name" : playbook.section[i].name,
                "header" : playbook.section[i].header,
                "body" : playbook.section[i].body,
                "listitems" : playbook.section[i].list,
                "faqitems" : playbook.section[i].faq
            })
            references.push(playbook.section[i].references)
        }
        for ( i = 0 ; i < playbook.plays.length ; i++){
          plays.push(playbook.plays[i].name
          )
        }
        let referenceLinks = [].concat.apply([], references);
        console.log(plays);
        return res.render('playbook', {
            title: 'Playbook',
            sectionContent: sectionContent,
            referenceLinks: referenceLinks,
            playContent: plays
        })
      }
    })
})

module.exports = router;