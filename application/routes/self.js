var express = require('express');
var nconf = require('nconf');
var winston = require('winston');
var IG = require('../lib/instagram');
var router = express.Router();

var ig_api = new IG('218907949.6b39776.87f2016bd4d146a7b7296e9cc52d8c14');

/* GET self page. */
router.get('/', function(req, res, next) {
    ig_api.user_self_media_recent_with_cache(function(err, medias, pagination, remaining, limit) {
        if(err) {
            logger.error('Error while fetching media information :' + err.stack);
            res.send('Error while fetching media information :' + err.stack);
        } else {
            var urls = [];
            for(var i= 0; i < medias.length; i++) {
                urls.push(medias[i].images.standard_resolution.url);
            }
            res.render('self', { urls: urls});
        }
    });
});

module.exports = router;
