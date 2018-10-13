const mongoose = require('mongoose');

const fuckOffSchema = new mongoose.Schema({
    from: String,
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: String,
    fav: false,
    destiny: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destiny'
    },
    destiny: {
        name: String,
        img: String,
        description: String,
        location: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point',
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            }
        },
        placeId: String
    }
    }, {timestamps: true,     
    toJSON: {
    transform: (doc, ret) => {
        ret.id = doc._id;
        ret.destiny.coordinates = doc.destiny.location.coordinates;
        delete ret.destiny.location;
        delete ret._id;
        delete ret.__v;
        return ret;
        }   
    }
});

const FuckOff = mongoose.model('FuckOff', fuckOffSchema);
module.exports = FuckOff;

