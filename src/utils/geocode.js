const request = require('request')
//encodeURIComponent
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGFtaWFuLTg4IiwiYSI6ImNqdHNpN2Z3YzExbDIzem11YTN0cjBheDYifQ.NR-YGuu-7d1mteUPwBKVdQ&limit=1'

    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to take the data from the service...', undefined)
        } else if (body.features.length === 0) {
            callback('Try again. Unable to find any result.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode