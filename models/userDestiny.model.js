const mongoose = require('mongoose');

const userDestinySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    DestinyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destiny'
    }
});

const userDestiny = mongoose.model('userDestiny', userDestinySchema);
module.exports = userDestiny;