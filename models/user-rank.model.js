const mongoose = require('mongoose');

const userRankSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    count: Number
})

const UserRank = mongoose.model('UserRank', userRankSchema);
module.exports = UserRank;