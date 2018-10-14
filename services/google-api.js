const axios = require('axios')
const createError = require('http-errors');
const Destiny = require('../models/destiny.model');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || '';


module.exports.generateAddress = () => {

    function generatePosition() {

        function getRandomRange(min, max) {
            return (Math.random() * (max - min) + min).toFixed(3) * 1;
        }

        return {
            lat: getRandomRange(-70, 70),
            lng: getRandomRange(-180, 180)
        };
    }
    
    let coordinates = generatePosition();
    
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=${GOOGLE_API_KEY}`)
        .then(response => {
            if( response.data.results[0]) {
                const place = response.data.results[0];
                const destiny = new Destiny(
                    place.place_id,
                    place.formatted_address,
                    place.geometry.location);

                return Promise.resolve(destiny)
                    .then(destiny => {
                        return axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${destiny.placeId}&fields=photo&key=${GOOGLE_API_KEY}`)
                            .then(placeDetails => {
                                if (placeDetails.data.result.photos) {
                                    const photoRef = placeDetails.data.result.photos[0].photo_reference

                                    return axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${GOOGLE_API_KEY}`)
                                    .then(placePhoto => {
                                        destiny.image = placePhoto.config.url;
                                        return Promise.resolve(destiny);
                                    })
                                } else {
                                    destiny.image = 'http://url-cualquiera';
                                    return Promise.resolve(destiny);
                                }
                            })
                    })
            } else {
                console.log('In the middle of fucking nowhere, Im trying again because life is shit but I feel lucky.')
                return this.generateAddress();
            }
        })
        .catch(error => console.log(error));
}
