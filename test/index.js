
/**
 * Dependencies
 */

var should = require('should');
var mapquest = require('../');

/**
 * API Key
 */

var API_KEY = 'FAKE_API_KEYs';

/**
 * Make sure API_KEY has been changed
 */

if (API_KEY === 'FAKE_API_KEY') {
  throw new Error('Change the `API_KEY` in `test/index.js` before testing');
}

/**
 * BDD
 */

describe('MqpQuest', function() {

  var apple = null;

  describe('#geocode()', function() {
    it('should get the proper lat/lon for an address', function(done) {
      mapquest.geocode({ 
        address: '1 Infinite Loop, Cupertino, CA 95014' 
      }, function(err, res) {
        res.latLng.lat.should.equal(37.33064);
        res.latLng.lng.should.equal(-122.028983);
        apple = res;
        done(err);
      });
    });

    it('should return an array of all possible results when all is true', function(done) {
      mapquest.geocode({ 
        address: '1 Infinite Loop, Cupertino, CA 95014',
        all: true
      }, function(err, res) {
        res.length.should.equal(1);
        done(err);
      });
    });

    it('should return nothing for an empty address', function(done) {
      mapquest.geocode({ 
        address: '' 
      }, function(err, res) {
        should.exist(err);
        should.not.exist(res);
        done();
      });
    });

    it('should return nothing for an invalid address', function(done) {
      mapquest.geocode({ 
        address: 'She sells sea shells' 
      }, function(err, res) {
        should.exist(err);
        should.not.exist(res);
        done();
      });
    });

    it('should get the proper lat/lon using a valid api key', function(done) {
      mapquest.geocode({ 
        address: '1 Infinite Loop, Cupertino, CA 95014', 
        key: API_KEY 
      }, function(err, res) {
        res.latLng.lat.should.equal(37.33064);
        done(err);
      });
    });

    it('should return an error with an invalid api key', function(done) {
      mapquest.geocode({ 
        address: '1 Infinite Loop, Cupertino, CA 95014', 
        key: 'INVALID_KEY' 
      }, function(err, res) {
        should.exist(err);
        done();
      });
    });
  });

  describe('#reverse()', function() {
    it('should get the same address given for lat lng returned', function(done) {
      mapquest.reverse({ 
        coordinates: { 
          latitude: apple.latLng.lat, 
          longitude: apple.latLng.lng 
        } 
      }, function(err, res) {
        apple.latLng.should.eql(res.latLng);
        apple.street.should.equal('1 Infinite Loop');
        apple.postalCode.should.equal('95014');
        done(err);
      });
    });

    it('should return an array of all possible addresses when all is true', function(done) {
      mapquest.reverse({ 
        coordinates: { 
          latitude: apple.latLng.lat, 
          longitude: apple.latLng.lng 
        },
        all: true
      }, function(err, res) {
        res.length.should.equal(1);
        done(err);
      });
    });

    it('should return nothing for empty coordinates', function(done) {
      mapquest.reverse({ 
        coordinates: {} 
      }, function(err, res) {
        should.not.exist(res);
        should.exist(err);
        done();
      });
    });

    it('should get the same address given for lat lng using a valid api key', function(done) {
      mapquest.reverse({ 
        coordinates: { 
          latitude: apple.latLng.lat, 
          longitude: apple.latLng.lng 
        },
        key: API_KEY
      }, function(err, res) {
        apple.latLng.should.eql(res.latLng);
        apple.street.should.equal('1 Infinite Loop');
        apple.postalCode.should.equal('95014');
        done(err);
      });
    });

    it('should return an error with an invalid api key', function(done) {
      mapquest.reverse({ 
        coordinates: { 
          latitude: apple.latLng.lat, 
          longitude: apple.latLng.lng 
        },
        key: 'INVALID_KEY'
      }, function(err, res) {
        should.exist(err);
        done();
      });
    });
  });

  describe('#batch()', function() {
    it('should geocode multiple addresses at once', function(done) {
      mapquest.batch({
        addresses: [ '1 Infinite Loop, Cupertino, CA 95014', '1600 Amphitheatre Parkway, Mountain View, CA 94043' ]
      }, function(err, res) {
        res.length.should.equal(2);
        res[0].street.should.equal('1 Infinite Loop');
        res[1].street.should.equal('1600 Amphitheatre Parkway');
        done(err);
      });
    });

    it('should geocode multiple addresses at once using a valid api key', function(done) {
      mapquest.batch({
        addresses: [ '1 Infinite Loop, Cupertino, CA 95014', '1600 Amphitheatre Parkway, Mountain View, CA 94043' ],
        key: API_KEY
      }, function(err, res) {
        res.length.should.equal(2);
        res[0].street.should.equal('1 Infinite Loop');
        res[1].street.should.equal('1600 Amphitheatre Parkway');
        done(err);
      });
    });

    it('should return an error with an invalid api key', function(done) {
      mapquest.batch({
        addresses: [ '1 Infinite Loop, Cupertino, CA 95014', '1600 Amphitheatre Parkway, Mountain View, CA 94043' ],
        key: 'INVALID_KEY'
      }, function(err, res) {
        should.exist(err);
        done();
      });
    });
  });
});
