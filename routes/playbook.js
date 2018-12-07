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

// // Main Playbook Route
// router.get('/playbook', function(req,res,next){
// 	Playbook.find().
//     exec(function (error, playbook) {
//       if (error) {
//         return next(error);
//       } else {
//         let main = playbook.filter(function(book){
//             return book.key === "overview";
//         });
//         let sub = playbook.filter(function(book){
//             return book.key !== "overview";
//         });
//         // let mainSections = main[0];
//         // let sectionContent = [];
//         // let related = [];
//         // for (i = 0 ; i < mainSections.detail.length ; i++){
//         //     sectionContent.push(mainSections.detail[i]);
//         // }
//         // for (i = 0 ; i < sub.length ; i++){
//         //     related.push({"name":sub[i].name, "heading":sub[i].heading})
//         // }
//         console.log(main);
//         console.log(sub);
//         // return res.render('playbook', { title: 'Playbook', 
//         //     name: mainSections.name,
//         //     heading: mainSections.heading,
//         //     summary: mainSections.summary,
//         //     sectionContent : sectionContent,
//         //     relatedContent : related
//     }})
// });

// // Playbook Section Routes
// router.get('/playbook/:name', function(req,res,next){
// 	Playbook.findOne( { name : req.params.name } )
// 	.populate('plays').
//     exec(function (error, playbook) {
//       if (error) {
//         return next(error);
//       } else {
// 					let sectionContent= [];
// 					for ( i = 0 ; i < playbook.detail.length ; i++){
// 						sectionContent.push(playbook.detail[i])
//                     }
//                     let relatedContent= [];
//                     for ( i = 0 ; i < playbook.plays.length ; i++){
//                         relatedContent.push({"name": playbook.plays[i].name, "heading": playbook.plays[i].heading})
//                     }
//                     console.log(relatedContent);
//                 // console.log(playbook)	
// 				// console.log(sectionContent);
//         // let playbookList = [];
//         // let playerList = [];
//         // for (i = 0 ; i < playbook.detail.length ; i++ ){
//         //   playbookList.push(playbook.detail[i]);}
//         // for (i = 0 ; i < playbook.players.length ; i++ ){
//         //   playerList.push(playbook.players[i]);   
//         // }
//         // console.log(playbook);
//         // console.log(playbookList);
//         // console.log(playerList);
//         return res.render('playbook', { title: 'Playbook', 
//             name: playbook.name,
//             heading: playbook.heading,
//             summary: playbook.summary,
//             sectionContent: sectionContent,
//             relatedContent: relatedContent
//     });
// }});
// });


// TEST Route
router.get('/playbook/:key', function(req,res,next){
	Playbook.findOne( { key : req.params.key } )
	// .populate('plays').
    .exec(function (error, playbook) {
      if (error) {
        return next(error);
      } else { 
        let sectionContent= [];
        let references= [];
        for ( i = 0 ; i < playbook.section.length ; i++){
            sectionContent.push({
                "name" : playbook.section[i].name,
                "header" : playbook.section[i].header,
                "body" : playbook.section[i].body,
                "listitems" : playbook.section[i].list
            })
            references.push(playbook.section[i].references)
        }
        // for ( i = 0 ; i < playbook.references.length ; i++){
        //     referenceLinks.push(playbook.references[i])
        // }
        // flatten referencelinks array
        let referenceLinks = [].concat.apply([], references);
        return res.render('playbook', {
            title: 'Playbook',
            sectionContent: sectionContent,
            referenceLinks: referenceLinks
          })
      }
    })
})

module.exports = router;