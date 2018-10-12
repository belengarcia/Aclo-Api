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

const FuckOff = mongoose.model('FuckOff', fuckOffSchema);
module.exports = FuckOff;
