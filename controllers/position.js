'use strict'
const request = require('request-promise')
const errors = require('../util/error_handling')

async function index(req, res) {
    var minLat = parseFloat(req.params.lat-0.15)
    var maxLat = parseFloat(req.params.lat+0.15)
    var minLng = parseFloat(req.params.lng-0.15)
    var maxLng = parseFloat(req.params.lng+0.15)
    res.json({
        'success': true,
        'location': {
            lat: req.params.lat,
            lng: req.params.lng
        },
        'services': {
            'mobike': JSON.parse(await mobike(req.params.lat, req.params.lng)),
            'nextbike': JSON.parse(await nextbike(req.params.lat, req.params.lng)),
            'emmy': JSON.parse(await emmy(minLat, maxLat, minLng, maxLng)),
            'coup': JSON.parse(await coup(minLat, maxLat, minLng, maxLng)),
            'car2go': JSON.parse(await car2go(minLat, maxLat, minLng, maxLng)),
            'drivenow': JSON.parse(await drivenow(minLat, maxLat, minLng, maxLng)),
            'driveby': JSON.parse(await driveby(minLat, maxLat, minLng, maxLng)),
            'ubeeqo': [],
            'bvg': [],
            //'mytaxi': await mytaxi(req.params.lat, req.params.lng),
            'uber': []
        }
    })

}

async function mobike(lat, lng) {
    var options = {
        method: 'POST',
        url: 'https://mwx.mobike.com/mobike-api/rent/nearbyBikesInfo.do',
        headers:
        {
            'user-agent': 'Mozilla/5.0 (Linux; Android 7.0; SM-G892A Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/60.0.3112.107 Mobile Safari/537.36 (or whatever)',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {latitude: lat, longitude: lng}
    };
    return request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body)
    });
}

async function nextbike() {
    return request('https://api.nextbike.net/maps/nextbike-live.json?city=362')
    //Todo: add filter algorithmen for bikes by nearest lat/lang
}

async function car2go(minLat, maxLat, minLng, maxLng) {
    return request('https://backend.carjump.net/v2/?&minLat='+minLat+'&minLng='+minLng+'&maxLat='+maxLat+'&maxLng='+maxLng+'&provider=car2go')
    //Todo: add filter algorithmen for bikes by nearest lat/lang
}

async function drivenow(minLat, maxLat, minLng, maxLng) {
    return request('https://backend.carjump.net/v2/?&minLat='+minLat+'&minLng='+minLng+'&maxLat='+maxLat+'&maxLng='+maxLng+'&provider=drivenow')
}

async function driveby(minLat, maxLat, minLng, maxLng) {
    return request('https://backend.carjump.net/v2/?&minLat='+minLat+'&minLng='+minLng+'&maxLat='+maxLat+'&maxLng='+maxLng+'&provider=driveby')
}

async function coup(minLat, maxLat, minLng, maxLng) {
    return request('https://backend.carjump.net/v2/?&minLat='+minLat+'&minLng='+minLng+'&maxLat='+maxLat+'&maxLng='+maxLng+'&provider=coup')
}

async function emmy(minLat, maxLat, minLng, maxLng) {
    return request('https://backend.carjump.net/v2/?&minLat='+minLat+'&minLng='+minLng+'&maxLat='+maxLat+'&maxLng='+maxLng+'&provider=emio')
}


async function mytaxi(lat, lng) {
    //TODO: update JSESSIONID from login
    var options = { method: 'PUT',
        url: 'https://api.mytaxi.com/fleettypeservice/v4/fleettypes',
        headers:
            { 'Postman-Token': '2399d41e-8439-b877-2783-a7b72760fb38',
                'Cache-Control': 'no-cache',
                Cookie: 'JSESSIONID=36780B515119019CD2E0BA0CC3D7D717; Path=/; HttpOnly',
                'Content-Type': 'application/json' },
        body:
            { pickupLocation: { coordinate: { latitude: lat, longitude: lng } },
                pickupTime: '2018-10-05T01:52:49.768+0200' },
        json: true };

    return request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });
}

module.exports = {
    index: index
}
