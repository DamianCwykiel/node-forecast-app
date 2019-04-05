const request = require('request');
//'?units=si&lang=pl'
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/12f5c5de48c2c30268c2be0fac959100/'+ latitude + ',' + longitude + '?units=si&lang=pl'

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Cannot connect to the service...', undefined)
        } else if (body.error) {
            callback('400 Error...Unable to find the location. Try again.', undefined)
        } else {
            //  console.log(`${response.body.daily.data[0].summary} It's currently ${response.body.currently.temperature} degress. There's a ${response.body.currently.precipProbability} % of rain.`)
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast
