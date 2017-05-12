var express = require('express');
var nconf = require('nconf');
var router = express.Router();
var api = require('instagram-node').instagram();
var router = express.Router();
nconf.file('../config/config.json');

/* GET self page. */
router.get('/', function(req, res, next) {
  api.use({ access_token: nconf.get('oauth:access_token') });
    api.user_self_media_recent({count: 10}, function(err, medias, pagination, remaining, limit) {
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
