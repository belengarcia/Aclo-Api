const fuckOffs = require('../models/fuck-off.model');
const destiny = require('../models/destiny.model');
const mongoose = require('mongoose');
const createError = require('http-errors');
const googleApi = require('../services/google-api')
const axios = require('axios')

module.exports.list = (req, res, next) => {
    fuckOffs.find( { $or: [
            { from : req.params.id },
            { to : req.params.id }
        ]})
        // .populate('from')
        // .populate('to')
        .then(data => {
            res.json(data)
        })
        .catch(error => next(error))
}


module.exports.create = (req, res, next) => {
    let finalDestiny = {};
    googleApi.generateAddress()
        .then((myDestiny) => {
            console.info('(> O.;..;.O)>     ')
            finalDestiny = new fuckOffs({
                from: req.user.id,
                to: req.params.id,
                message: req.body.message,
                destiny: {
                    name: myDestiny.name,
                    img: myDestiny.image,
                    placeId: myDestiny.placeId,
                    location: {
                        coordinates: Object.values(myDestiny.coordinates)
                    }
                }
            })

            finalDestiny.save()
            .then(data => res.status(201).json(data))
            .catch(error => next(error));
        })
        .catch(err => console.error(err))    
}