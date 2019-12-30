const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/12f5c5de48c2c30268c2be0fac959100/'+ latitude + ',' + longitude + '?units=si&lang=pl'

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Cannot connect to the service...', undefined)
        } else if (body.error) {
            callback('400 Error...Unable to find the location. Try again.', undefined)
        } else {
            //console.log(body.daily.data[0])
            //  console.log(`${response.body.daily.data[0]} It's currently ${response.body.currently.temperature} degress. There's a ${response.body.currently.precipProbability} % of rain.`)
            //callback(undefined, body.daily.data[0].summary + ' It currently is ' + body.currently.temperature + ' degrees and there is a ' + body.currently.precipProbability + '% chance of rain. Humidity equals ' + body.daily.data[0].humidity + '% and the wind speed reaches ' + body.daily.data[0].windSpeed +' km/h.')
             callback(undefined, body.daily.data[0].summary + ' Obecnie temperatura wynosi ' + Math.round(body.currently.temperature) + '°C  jest ' +  Math.round(body.currently.precipProbability  * 100) + '% szans na opady. Wilgotność wynosi ' + Math.round(body.daily.data[0].humidity  * 100 ) + '% a prędkość wiatru osiąga ' + Math.round(body.daily.data[0].windSpeed) +' km/h.')
        }
    })
}

module.exports = forecast
