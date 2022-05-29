const request = require('request')

geocoding = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1Ijoibmhhbm5nbzEyMyIsImEiOiJjbDJyaXQzbHIxenkyM2pwNmcxcDBiZnc1In0.wiAwUuKCW2vXPLkDNDKRIg&limit=1'
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location service', undefined)
    } else if (body.features.length === 0) {
      callback('No matching result', undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longtitude: body.features[0].center[1],
        location: body.features[0].place_name,
      })
    }
  })
}

module.exports = geocoding
