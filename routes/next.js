var express = require('express');
var router = express.Router();

// pull in data from json file & create variables to source data
// { cards } the same thing as saying data.cards as part of the json
var { data } = require('../data/sampleData.json');
var { cards } = data; 

// custom router parameters :id and is stored in the req.params property
router.get('/next/:id', function(req, res){
    // setting up the request query paramters to get the right output from the file
    const { side } = req.query;
    const { id } = req.params;
    const message = cards[id][side];
    const templateData = { message };

    res.render('index', templateData)

    // if ( side === "") {
    //     res.render('index', { message : "Main Page Testing" } );
    // } else {
    //     res.render('index', templateData);
    // };

    // {title : "HEY", message : cards[req.params.id].question });
});

router.get('/next', function(req,res) {
    res.render('index', {title : "HEY", 
    message : "TESTING MAIN NEXT PAGE" });
});

module.exports = router;
