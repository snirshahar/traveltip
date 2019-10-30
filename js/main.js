console.log('Main!');

import locService from './services/loc.service.js'
import mapService from './services/map.service.js'


locService.getLocs()
    .then(locs => console.log('locs', locs))



window.onload = () => {
    locService.getPosition()
        .then(pos => {
            mapService.initMap(pos.coords.latitude, pos.coords.longitude)
                .then(() => {
                    locService.getPosition()
                        .then(pos => {
                            mapService.addMarker({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                        })

                })
                .catch(console.log('INIT MAP ERROR'));
        })



    locService.getPosition()
        .then(pos => {
            locService.panTo(pos.coords.latitude, pos.coords.longitude)
            console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

locService.getPosition()
    .then(pos =>{
        document.querySelector('.btn').addEventListener('click', (ev) => {
            console.log('Aha!', ev.target);
            mapService.panTo(pos.coords.latitude, pos.coords.longitude);
    })

})
