const mongoose = require('mongoose');

const destinySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: String,
    description: String,
    location:{
        type: {
            type: String,
            enum: ['Point'],
            required: true

        }, 
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

const Destiny = mongoose.model('Destiny', destinySchema);
module.exports = Destiny;