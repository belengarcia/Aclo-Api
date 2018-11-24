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
                                        destiny.images = placePhoto.config.url;
                                        return Promise.resolve(destiny);
                                    })
                                } else {
                                    let fakeImages = [
                                        'https://images.unsplash.com/photo-1533066636271-fdbe3e84ad80?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1fae158ab9dd4bc8fadc241c6037bd17&auto=format&fit=crop&w=668&q=80',
                                        'https://images.unsplash.com/photo-1523307143330-919ae48363c6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=26d35979b196bcbca08676dc6b2eccf6&auto=format&fit=crop&w=804&q=80',
                                        'https://images.unsplash.com/photo-1484074813843-42585e45f02c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9fb0353314d39f0597dba89053b26e09&auto=format&fit=crop&w=800&q=60',
                                        'https://images.unsplash.com/photo-1530517019535-3dcaf8bbc7f3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1b647c3e319217f1945f5200a3d5e9c2&auto=format&fit=crop&w=2442&q=80',
                                        'https://images.unsplash.com/photo-1516653980844-c68df1de5249?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1e07d1cbc2e50a0914b197afc907f9ba&auto=format&fit=crop&w=1350&q=80',
                                        'https://images.unsplash.com/photo-1519627693759-44a216101217?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=131466f9095e786301520bd17c679ac4&auto=format&fit=crop&w=800&q=60',
                                        'https://images.unsplash.com/photo-1508233620467-f79f1e317a05?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=93a811e9227eaf4510ef51e355d8c2ad&auto=format&fit=crop&w=1268&q=80'
                                    ]
                                    destiny.images = fakeImages[Math.floor(Math.random() * fakeImages.length)]
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
