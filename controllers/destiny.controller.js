const Destiny = require('../models/destiny.model');
const mongoose = require('mongoose');
const createError = require('http-errors');

module.exports.list = (req, res, next) => {
    Destiny.find()
        .then(destinies => res.json(destinies))
        .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
    Destiny.findById(req.params.id)
        .then(destiny => {
            if(!destiny){
                throw createError(404, 'Destiny not found');
            } else {
                res.json(destiny)
            }
        })
        .catch(error => next(error))
}

module.exports.create = (req, res, next) => {

    const destiny = new Destiny(req.body);

    if(req.files){
        destiny.img = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
    }

    destiny.save()
        .then(destiny => res.status(201).json(destiny))
        .catch(error => next(error));
} 

module.exports.delete = (req, res, next) => {
    Destiny.findOneAndDelete({_id: req.params.id})
        .then(destiny => {
            if(!destiny){
                throw createError(404, 'Destiny not found')
            } else {
                res.status(204).json();
            }
        })
        .catch(error => next(error));
}

module.exports.update = (req, res, next) => {
    changes = {
        name: req.body.name,
        img: req.body.img,
        description: req.body.description
    }

    Destiny.findByIdAndUpdate(req.params.id, {$set: changes}, { new: true, runValidators: true })
        .then(destiny => {
            if(!destiny) {
                throw createError(404, 'Destiny not found')
            } else {
                res.json(destiny)
            }
        })
        .catch(error => next(error));
}