var express = require('express');
var logger = require('winston');
var api = require('instagram-node').instagram();
var oauthcontroller = require('./igOauthController');
var api = oauthcontroller.api;
var router = express.Router();


router.get('/media/populer', (req, res) => {
     api.media_popular(function(err, media, remaining, limit) {
        if(err) {
            logger.error('Error while fetching media information :' + err.stack);
            res.send('Error while fetching media information :' + err.stack);
        } else {
           res.send(medias);
        }
    });
});

module.exports = router;
