export default {
    getLocs: getLocs,
    getPosition: getPosition,
    findPlace,
    panTo,
}

import {panTo, addMarker} from './map.service.js'


var locs = [{ lat: 11.22, lng: 22.11 }]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });

}


function getPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}


function findPlace(str) {
    const API_KEY = 'AIzaSyCEo38UCVrZazuy9GdJ42h0ueKkHjnpB5M';
    var words = str.split(' ');
    var strHtml = ''
    words.forEach(word => strHtml += word + '+');
    getLtLng(`https://maps.googleapis.com/maps/api/geocode/json?address=${strHtml}&key=${API_KEY}`)
}

function getLtLng(data) {
    axios(data)
    .then(data => data.data.results[0].geometry.location)
    .then(res=> {
        panTo(res.lat, res.lng);
        addMarker(res)
        getWeather(res.lat, res.lng)
    })
}