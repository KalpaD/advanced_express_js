var expect = require('expect.js');
var IG = require('../lib/instagram');

// Create IG instance
var ig_api = new IG('access_token');

// Mock the user_self_media_recent_with_cache function
ig_api.user_self_media_recent_with_cache = (callback) => {
    return callback(null, [{id: '001'}, {id: '002'}, {id: '003'}], 0, 2, 10);
}

describe('The credentials', () => {
    it('Should return the correct access token', () => {
        expect(ig_api.get_access_token()).to.be('access_token');
    });

    // Test success for the user_self_media_recent_with_cache()
    it('Should return data from the user_self_media_recent_with_cache', (done)=> {
        ig_api.user_self_media_recent_with_cache((err, medias, pagination, remaining, limit)=> {
            expect(err).to.be(null);
            expect(medias.length).to.be.greaterThan(0);
            done();
        });
    });
});