var instagram = require("instagram-node").instagram();
var nconf = require('nconf');

var ig = function(access_token) {
    this.access_token = access_token;
    instagram.use({ access_token: this.access_token });

    this.timeout = 5;
    this.cache = {};
}

ig.prototype.get_access_token = function() {
    return this.access_token;
}

ig.prototype.user_self_media_recent = function(callback) {
    instagram.user_self_media_recent({count: 10}, function(err, medias, pagination, remaining, limit) {
        if (err) { return callback(err, null, null); }
        
        this.cache = {
            "medias": medias,
            "limit": limit,
            "timeout": (+(new Date)) + (this.timeout * 1000)
        };
        
        return callback(err, medias, limit);
    }.bind(this));
}

ig.prototype.user_self_media_recent_with_cache = function(callback) {
    console.log('Entering user_self_media_recent_with_cache');
    var data = this.fetch_from_cache();
    console.log('Data from cache : '+ data);
    if (data) {
        return callback(null, data.medias, data.limit);
    }
    return this.user_self_media_recent(callback);
}

ig.prototype.fetch_from_cache = function() {
    console.log('Entering fetch_from_cache');
    if (this.cache.medias && (new Date).getTime() < this.cache.timeout) {
        return {"medias": this.cache.medias, "limit": this.cache.limit};
    }
    return false
}

ig.prototype.get_media_from_id = function(id) {
    for (var i in this.cache.medias) {
        if(this.cache.medias[i].id === id) {
            return this.cache.medias[i];
        }
    }
    return false;
}

module.exports = ig;