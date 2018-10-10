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
}, {timestamps: true,     
    toJSON: {
    transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret;
        }   
    }   
});

const Destiny = mongoose.model('Destiny', destinySchema);
module.exports = Destiny;