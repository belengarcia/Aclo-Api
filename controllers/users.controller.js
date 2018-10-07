const mongoose = require('mongoose');
const User = require('../models/user.model');
const createError = require('http-errors');

module.exports.create = (req, res, next) => {

    User.findOne({ mail: req.body.mail })
        .then(user => {
            if (user) {
                throw createError(409, `User with email ${req.body.mail} already is registered`)
            } else {
                user = new User(req.body);
                user.save()
                    .then(user => res.status(201).json(user))
                    .catch(error => next(error))
            }
        })
        .catch(error => next(error));
}

module.exports.list = (req, res, next) => {
    User.find()
        .then(users => {
            if(users) {
                res.json(users);
            } else {
                throw createError(404, 'Users not found')
            }
        })
        .catch(error => next(error))
}

module.exports.delete = (req, res, next) => {
    User.findByIdAndDelete(req.params.id) //user?
        .then(user => {
            if (!user) {
                throw createError(404, 'User not found');
            } else {
                res.status(204).json()
            }
        })
        .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
    User.findById(req.params.id)
        .populate('personalHate')
        .then(user => {
            if(!user){
                throw createError(404, 'User not found');
            } else {
                res.json(user)
            }
        })
        .catch(error => next(error))
}

module.exports.update = (req, res, next) => {
    changes = {
        name: req.body.name,
        profilePic: req.body.profilePic,
        mail: req.body.mail
    }

    if(req.files){
        changes.profilePic = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
    }

    if (req.user.role === 'admin') {
        changes.role = req.body.role
    }

    User.findByIdAndUpdate(req.params.id, {$set : changes}, { new: true, runValidators: true })
        .then(user => {
            if(!user) {
                throw createError(404, 'User not found')
            } else {
                res.json(user)
            }
        })
        .catch(error => next(error))
}

