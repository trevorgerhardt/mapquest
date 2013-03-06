
/**
 * Dependencies
 */

var get = require('superagent').get;

/**
 * MapQuest base url
 */

var url = 'http://open.mapquestapi.com/geocoding/v1';

/**
 * Geocode an address
 */

module.exports.geocode = function(address, callback) {
  get(url + '/address').query({ location: address, maxResults: 1 }).end(function(err, res) {
    if (err) {
      callback(err);
    } else {
      callback(null, res.body.results[0].locations[0]);
    }
  });
};

/**
 * Reverse geocode a lat, lon
 */

module.exports.reverse = function(coordinates, callback) {
  get(url + '/reverse').query({ location: coordinates.latitude + ',' + coordinates.longitude, maxResults: 1 }).end(function(err, res) {
    if (err) {
      callback(err);
    } else {
      callback(null, res.body.results[0].locations[0]);
    }
  });
};

/**
 * Batch geocode addresses
 */

module.exports.batch = function(addresses, callback) {
  var batch = get(url + '/batch');
  for (var i = 0; i < addresses.length; i++) {
    batch.query({ location: addresses[i] });
  }
  batch.end(function(err, res) {
    if (err) {
      callback(err);
    } else {
      var results = res.body.results.map(function(result) {
        return result.locations[0];
      });

      callback(null, results);
    }
  });
};
