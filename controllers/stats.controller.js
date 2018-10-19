const FuckOffs = require('../models/fuck-off.model');
const UserRank = require('../models/user-rank.model')
const mongoose = require('mongoose');
const createError = require('http-errors');
const User = require('../models/user.model')

module.exports.ranking = (req, res, next) => {
    FuckOffs.aggregate([{
        $group: {
            _id: '$from',
            count: {$sum: 1}
        }
      }])
      .exec(function(err, ranks) {
        UserRank.populate(ranks, {path: '_id'}, function(err) {
            if(err) {
                next(error)
            }
            res.json(ranks)
          })
      })
}

module.exports.stats = (req, res, next) => {
    FuckOffs.aggregate([
        { $match: {'from': 'tu from'}},
        { $group: {'_id': {
                        'year': { '$year': "$createdAt" },
                        'month': { '$month': "$createdAt" },
                        'day': { '$dayOfMonth': "$createdAt" }}}}
      ]).then((result) => res.json(result))
}