const axios = require('axios')
const createError = require('http-errors');

module.exports.generateAddress = () => {
    
    generatePosition = () => {
        function getRandomRange(min, max) {
            return (Math.random() * (max - min + min).toFixed(3) * 1);
        }
    
        let posLat = getRandomRange(-70, 70);
        let posLng = getRandomRange(-180, 180);
    
        let pos = {
            lat: posLat,
            lng: posLng
        }
    
        return pos;
    }
    
    
    let newPos = generatePosition();
    
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${newPos.lat},${newPos.lng}&key=AIzaSyBaWJRBFCUYVRpyLEpJBrl8eB08XFGf7pY`)
        .then(response => {
            if(response.data.results[0]) {
                console.log(response.data.results[0])
                return response.data.results[0];
            } 
            else {
                console.log('In the middle of fucking nowhere, Im trying again because life is shit but I feel lucky.')
                this.generateAddress();
            }
        })
        .catch(error => console.log(error));
}

generatePhotoReference = (placeId) => {
    axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&fields=photo&key=AIzaSyBaWJRBFCUYVRpyLEpJBrl8eB08XFGf7pY`)
    //tengo que return result.photos[0].photo_reference
}

generatePhoto = (photoRef) => {
    axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}`)
}
