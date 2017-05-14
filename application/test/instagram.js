var expect = require('expect.js');
var IG = require('../lib/instagram');
var sinon = require('sinon');

// Create IG instance
var ig_api = new IG('access_token');

// Mock the user_self_media_recent_with_cache function
ig_api.user_self_media_recent_with_cache = (callback) => {
    return callback(null, [{id: '001'}, {id: '002'}, {id: '003'}], 0, 2, 10);
}

beforeEach(() => {
    this.sinon = sinon.sandbox.create();
});

afterEach(() => {
    this.sinon.restore();
});

describe('The credentials', () => {
    it('Should return the correct access token', () => {
        expect(ig_api.get_access_token()).to.be('access_token');
    });

    // Test success for the user_self_media_recent_with_cache()
    it('Should return data from the user_self_media_recent_with_cache', (done)=> {
        ig_api.user_self_media_recent_with_cache((err, medias, pagination, remaining, limit) => {
            expect(err).to.be(null);
            expect(medias.length).to.be.greaterThan(0);
            done();
        });
    });

    it('Should call fetch_from_cache when loading via cache', (done)=> {
        // Set up the spy using sinon
        this.sinon.spy(ig_api, 'fetch_from_cache');

        ig_api.user_self_media_recent_with_cache((err, medias, pagination, remaining, limit) => {
            expect(ig_api.fetch_from_cache.callCount).to.be(0);
            done();
        });
    });
});