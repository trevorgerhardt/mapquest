
var should = require('should')
  , mapquest = require('../');

describe('MqpQuest', function() {

  var apple = null;

  describe('#geocode()', function() {
    it('should get the proper lat/lon for an address', function(done) {
      mapquest.geocode('1 Infinite Loop, Cupertino, CA 95014', function(err, res) {
        res.latLng.lat.should.equal(37.33064);
        res.latLng.lng.should.equal(-122.028983);
        apple = res;
        done(err);
      });
    });

    it('should return nothing for an empty address', function(done) {
      mapquest.geocode('', function(err, res) {
        should.not.exist(res);
        done(err);
      });
    });

    it('should return nothing for an invalid address', function(done) {
      mapquest.geocode('She sells sea shells', function(err, res) {
        should.not.exist(res);
        done(err);
      });
    });
  });

  describe('#reverse()', function() {
    it('should get the same address given for lat lng returned', function(done) {
      mapquest.reverse({ latitude: apple.latLng.lat, longitude: apple.latLng.lng }, function(err, res) {
        apple.latLng.should.eql(res.latLng);
        apple.street.should.equal('1 Infinite Loop');
        apple.postalCode.should.equal('95014');
        done(err);
      });
    });

    it('should return nothing for empty coordinates', function(done) {
      mapquest.reverse({}, function(err, res) {
        should.not.exist(res);
        done(err);
      });
    });
  });

  describe('#batch()', function() {
    it('should geocode multiple addresses at once', function(done) {
      mapquest.batch([ '1 Infinite Loop, Cupertino, CA 95014', '1600 Amphitheatre Parkway, Mountain View, CA 94043' ], function(err, res) {
        res.length.should.equal(2);
        res[0].street.should.equal('1 Infinite Loop');
        res[1].street.should.equal('1600 Amphitheatre Parkway');
        done(err);
      });
    });
  });
});
