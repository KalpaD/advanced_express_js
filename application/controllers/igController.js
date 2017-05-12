var express = require('express');
var logger = require('winston');
var api = require('instagram-node').instagram();
var nconf = require('nconf');
nconf.file('../config/config.json');
var router = express.Router();


var redirect_uri = 'http://localhost:8000/igoauth/oauth/done';
                        
// This is where you would initially send users to authorize 
router.get('/oauth/user', (req, res) => {
     api.use({
        client_id: nconf.get('oauth:client_id'),
        client_secret: nconf.get('oauth:client_secret')
    });
    res.redirect(api.get_authorization_url(redirect_uri, { state: 'a state' }));
});

// This is your redirect URI 
router.get('/oauth/done', (req, res) => {
    api.authorize_user(req.query.code, redirect_uri, function(err, result) {
        if (err) {
            logger.error(err.body);
            res.send("Didn't work");
        } else {
            logger.info('Access token retrived successfully : ' + result.access_token);
            res.send('You made it!!');
        }
    });
});

/**
 * Get the recent 10 media posted by user
 */
router.get('/media/self', (req, res) => {
    api.use({ access_token: '218907949.6b39776.87f2016bd4d146a7b7296e9cc52d8c14' });
    api.user_self_media_recent({count: 10}, function(err, medias, pagination, remaining, limit) {
        if(err) {
            logger.error('Error while fetching media information :' + err.stack);
            res.send('Error while fetching media information :' + err.stack);
        } else {
            res.send(medias);
        }
    });
});

module.exports = router;