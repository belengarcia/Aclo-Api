const userDestiny = require('../models/userDestiny.model');
const mongoose = require('mongoose');
const createError = require('http-errors');

module.exports.list = (req, res, next) => {
    userDestiny.find({userId: req.params.id})
        .then(destinies => res.json(destinies))
        .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
    userDestiny.findById(req.params.id)
        .then(destiny => {
            if(!destiny){
                throw createError(404, 'Destiny not found')
            } else {
                res.json(destiny)
            }
        })
        .catch(error => next(error))
}

module.exports.create = (req, res, next) => {
    const userDest = new userDestiny(req.body);

    userDestiny.save()
        .then(destiny => res.status(201).json(destiny))
        .catch(error => next(error))
}

module.exports.delete = (req, res, next) => {
    userDestiny.findOneAndDelete({_id: req.params.id})
        .then(destiny => {
            if(!destiny){
                throw createError(404, 'Destiny not found');
            } else {
                res.status(204).json();
            }
        })
        .catch(error => next(error));
}