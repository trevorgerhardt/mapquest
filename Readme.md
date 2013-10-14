
# mapquest

  Geocode, reverse geocode, and batch geocode using [MapQuests open api](http://open.mapquestapi.com/geocoding/).

## Installation via npm

    $ npm install mapquest

## Location Object

  All functions return a location object. An example location object for the Google Headquarters is below.

    {
      latLng: {
        lng: -122.086672,
        lat: 37.423581
      },
      adminArea4: 'Santa Clara County',
      adminArea5Type: 'City',
      adminArea4Type: 'County',
      adminArea5: 'Santa Clara',
      street: '1600 Amphitheatre Parkway',
      adminArea1: 'United States of America',
      adminArea3: 'California',
      type: 's',
      displayLatLng: {
        lng: -122.086672,
        lat: 37.423581
      },
      linkId: 0,
      postalCode: '94043',
      sideOfStreet: 'N',
      dragPoint: false,
      adminArea1Type: 'Country',
      geocodeQuality: 'ADDRESS',
      geocodeQualityCode: 'L1AXA',
      mapUrl: 'http://open.mapquestapi.com/staticmap/v4/getmap?type=map&size=225,160&pois=purple-1,37.423581,-122.086672,0,0|&center=37.423581,-122.086672&zoom=12&key=Kmjtd%7Cluu7n162n1%2C22%3Do5-h61wh&rand=2110607258',
      adminArea3Type: 'State'
    }

## API

  API Keys can be set as an environment variable retrieved with `process.env.MAPQUEST_API_KEY` or passed in the options object as `key`.

### .geocode(options, callback)

  Given an address, passes the callback a location object. Pass `all: true` in the options object to receive an array of all the locations retrieved.

    mapquest.geocode({ address: '1600 Amphitheatre Parkway, Santa Clara CA 94043' }, function(err, location) { console.log(location); });

### .reverse(options, callback)

  Given a coordinates object containing latitude and longitude, passes the callback a location object. Pass `all: true` in the options object to receive an array of all the locations retrieved.

    mapquest.reverse({ coordinates: { latitude: 37.423581, longitude: -122.086672 } }, function(err, location) { console.log(location); });

### .batch(options, callback)

  Given an array of addresse, passes the callback an array of location objects.

    mapquest.batch({ addresses: [ '1600 Amphitheatre Parkway, Santa Clara CA 94043' ] }, function(err, locations) { console.log(locations); });

## License

  MIT
