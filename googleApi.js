const axios = require('axios')
const createError = require('http-errors');



generatePosition = () => {

    let randomLat = function getRandomLat(min, max) {
        return (Math.random() * (max - min) + min).toFixed(3) * 1;;
    }
    let randomLng = function getRandomLng(min, max) {
        return (Math.random() * (max - min) + min).toFixed(3) * 1;;
    }

    let posLat = randomLat(-70, 70)
    let posLng = randomLng(-180, 180)

    let pos = {
        lat: posLat,
        lng: posLng
    }

    return pos;
}

generateAddress = () => {
    let newPos = generatePosition();
    
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${newPos.lat},${newPos.lng}&key=AIzaSyBaWJRBFCUYVRpyLEpJBrl8eB08XFGf7pY`)
        .then(response => {
            if(response.data.results[0]){
                console.log('in')
                console.log(response.data.results[0]);
            } else if(response.data.status === 'ZERO_RESULTS' ) {
                console.log('In the middle of fucking nowhere, Im trying again because life is shit but I feel lucky.')
                generateAddress()
            } 
        })
        .catch(error => console.log(error));
}
let address = generateAddress()

generatePhotoReference = (placeId) => {
    axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&fields=photo&key=AIzaSyBaWJRBFCUYVRpyLEpJBrl8eB08XFGf7pY`)
    //tengo que return result.photos[0].photo_reference
}

generatePhoto = (photoRef) => {
    axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}`)
}

module.exports = address;