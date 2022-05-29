const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=2690dfb95819e6a171fa358243eaea39&query=' +
    longitude +
    ',' +
    latitude +
    '&units=f'
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service', undefined)
    } else if (body.error) {
      callback('No Matching result!', undefined)
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]} .It is currently ${body.current.temperature} degrees out. But it feels like ${body.current.feelslike} degrees. The humidity is ${body.current.humidity}%`
      )
    }
  })
}
module.exports = forecast
