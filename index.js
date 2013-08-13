
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

module.exports.geocode = function(options, callback) {
  var address = options.address;
  var all = options.all;
  var key = options.key;

  var geocode = get(url + '/address').query({
    location: address
  });

  if (key) {
    geocode.query({ key: key });
  } else if (process.env.MAPQUEST_API_KEY) {
    geocode.query({ key: process.env.MAPQUEST_API_KEY });
  }

  geocode.end(function(err, res) {
    if (err) {
      callback(err);
    } else if (res.body.results[0].locations.length === 0 && res.body.info.statuscode !== 200) {
      callback(new Error(res.body.info.messages[0]));
    } else {
      var results = res.body.results[0].locations[0];
      if (all) {
        results = res.body.results.map(function(result) {
          return result.locations[0];
        });
      }

      callback(null, results);
    }
  });
};

/**
 * Reverse geocode a lat, lon
 */

module.exports.reverse = function(options, callback) {
  var all = options.all;
  var coordinates = options.coordinates;
  var key = options.key;

  var reverse = get(url + '/reverse').query({
    location: coordinates.latitude + ',' + coordinates.longitude
  });

  if (key) {
    reverse.query({ key: key });
  } else if (process.env.MAPQUEST_API_KEY) {
    reverse.query({ key: process.env.MAPQUEST_API_KEY });
  }

  reverse.end(function(err, res) {
    if (err) {
      callback(err);
    } else if (res.body.results[0].locations.length === 0 && res.body.info.statuscode !== 200) {
      callback(new Error(res.body.info.messages[0]));
    } else {
      var results = res.body.results[0].locations[0];
      if (all) {
        results = res.body.results.map(function(result) {
          return result.locations[0];
        });
      }

      callback(null, results);
    }
  });
};

/**
 * Batch geocode addresses
 */

module.exports.batch = function(options, callback) {
  var addresses = options.addresses;
  var key = options.key;

  var batch = get(url + '/batch');
  for (var i = 0; i < addresses.length; i++) {
    batch.query({ location: addresses[i] });
  }

  if (key) {
    batch.query({ key: key });
  } else if (process.env.MAPQUEST_API_KEY) {
    batch.query({ key: process.env.MAPQUEST_API_KEY });
  }

  batch.end(function(err, res) {
    if (err) {
      callback(err);
    } else if (res.body.results[0].locations.length === 0 && res.body.info.statuscode !== 200) {
      callback(new Error(res.body.info.messages[0]));
    } else {
      var results = res.body.results.map(function(result) {
        return result.locations[0];
      });

      callback(null, results);
    }
  });
};
