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

module.exports.geocode = function(key, address, callback) {
  if (key != undefined) {
    u = url + '/address?key='+key;
  } else {
    u = url + '/address';
  }  
  get(u).query({location: address, maxResults: 1 }).end(function(err, res) {
    if (err) {
      callback(err);
    } else {
      callback(null, res.body.results[0].locations);
    }
  });
};

/**
 * Reverse geocode a lat, lon
 */

module.exports.reverse = function(key, coordinates, callback) {
  if (key != undefined) {
    u = url + '/reverse?key='+key;
  } else {
    u = url + '/reverse';
  }
  get(u).query({ location: coordinates.latitude + ',' + coordinates.longitude, maxResults: 1 }).end(function(err, res) {
    if (err) {
      callback(err);
    } else {
      callback(null, res.body.results[0].locations);
    }
  });
};

/**
 * Batch geocode addresses
 */

module.exports.batch = function(key, addresses, callback) {
  if (key != undefined) {
    u = url + '/batch?key='+key;
  } else {
    u = url + '/batch';
  }
  var batch = get(u);
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
