const mongoose = require('mongoose');

const userDestinySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    destinyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destiny'
    }
}, {timestamps: true,     
    toJSON: {
    transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
        }   
    }   
});

const userDestiny = mongoose.model('userDestiny', userDestinySchema);
module.exports = userDestiny;