'use strict'
const request = require('request-promise')
const errors = require('../util/error_handling')

async function index(req, res) {
    var from = unescape(encodeURIComponent(req.body.from))
    var to = unescape(encodeURIComponent(req.body.to))
    var car = JSON.parse(await getCarRoute(from, to))
    var bicycle = JSON.parse(await getBicycleRoute(from, to))
    res.json({
        'success': true,
        'location': {
            from: {
                lat: car.routes[0].legs[0].start_location.lat,
                lng: car.routes[0].legs[0].start_location.lng
            },
            to: {
                lat: car.routes[0].legs[0].end_location.lat,
                lng: car.routes[0].legs[0].end_location.lng
            }
        },
        'car': {
            'duration': car.routes[0].legs[0].duration.value,
            'distance': car.routes[0].legs[0].distance.value
        },
        'bicycle': {
            'duration': bicycle.routes[0].legs[0].duration.value,
            'distance': bicycle.routes[0].legs[0].distance.value
        }
    })

}

async function getCarRoute(from, to) {
    return request('https://maps.googleapis.com/maps/api/directions/json?origin='+from+'&destination='+to+'&key=AIzaSyB4JiSKkno4R6zOvTSEwWRuGsmLavhWjGg')
}

async function getBicycleRoute(from, to) {
    return request('https://maps.googleapis.com/maps/api/directions/json?mode=bicycling&origin='+from+'&destination='+to+'&key=AIzaSyB4JiSKkno4R6zOvTSEwWRuGsmLavhWjGg')
}

module.exports = {
    index: index
}
