const fuckOffs = require('../models/fuck-off.model');
const mongoose = require('mongoose');
const createError = require('http-errors');

module.exports.list = (req, res, next) => {
    fuckOffs.find({from : req.user.id})
        .then(data => {
            res.json(data)
        })
        .catch(error => next(error))
}

module.exports.listTo = (req, res, next) => {
    fuckOffs.find({to : req.user.id})
        .then(data => {
            res.json(data)
        })
        .catch(error => next(error))
}

module.exports.create = (req, res, next) => {
    const newData = new fuckOffs({
        from: req.user.id,
        to: req.params.id, 
        message: req.body.message
    })
    newData.save()
        .then(data => res.status(201).json(data))
        .catch(error => next(error));
}

