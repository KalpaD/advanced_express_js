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
            
            res.render('self', { medias: medias });
        }
    });
});

router.get('/:id', function(req, res, next) {
    var selectedMedia = ig_api.get_media_from_id(req.params.id);
    res.render('single', { selectedMedia : selectedMedia });
});

module.exports = router;
