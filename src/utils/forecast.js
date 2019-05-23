const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/12f5c5de48c2c30268c2be0fac959100/'+ latitude + ',' + longitude + '?units=si&lang=pl'

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Cannot connect to the service...', undefined)
        } else if (body.error) {
            callback('400 Error...Unable to find the location. Try again.', undefined)
        } else {
             callback(undefined, body.daily.data[0].summary + ' Obecnie temperatura wynosi ' + Math.round(body.currently.temperature) + '°C  jest ' +  Math.round(body.currently.precipProbability  * 100) + '% szans na opady. Wilgotność wynosi ' + Math.round(body.daily.data[0].humidity  * 100 ) + '% a prędkość wiatru osiąga ' + body.daily.data[0].windSpeed +' km/h.')
        }
    })
}

module.exports = forecast
