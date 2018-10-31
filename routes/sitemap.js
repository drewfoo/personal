var express = require('express');
var router = express.Router();

router.get('/sitemap', function(req, res){
    res.render('sitemap', {title : "Sitemap"});
});

module.exports = router;