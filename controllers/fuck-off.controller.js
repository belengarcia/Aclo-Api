const FuckOffs = require('../models/fuck-off.model');
const destiny = require('../models/destiny.model');
const mongoose = require('mongoose');
const createError = require('http-errors');
const googleApi = require('../services/google-api')
const sendEmail = require('../services/mailer-service')
const User = require('../models/user.model')

module.exports.list = (req, res, next) => {
    FuckOffs.find( { $or: [
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
            finalDestiny = new FuckOffs({
                from: req.user.id,
                to: req.params.id,
                message: req.body.message, //para un futuro poder añadir mns personalizado
                destiny: {
                    name: myDestiny.name,
                    img: myDestiny.images,
                    placeId: myDestiny.placeId,
                    location: {
                        coordinates: Object.values(myDestiny.coordinates)
                    }
                }
            })
            
            finalDestiny.save().then(data => { 
                Promise.all([
                    User.findById(data.from),
                    User.findById(data.to)
                ]).then((values) => {
                    const from = values[0];
                    const to = values[1];
                    if (from.mail != to.mail){
                        sendEmail.send(data, from, to);
                    }
                    res.json(data)
                })
                .catch(error => next(error));
            })
        })
        .catch(err => console.error(err))    
}

module.exports.createOutsider = (req, res, next) => {
    let finalDestiny = {};
    googleApi.generateAddress()
    .then((outsiderDestiny) => {
        console.info('OUT(> O.;..;.O)>     ')
        finalDestiny = new FuckOffs({
            from: req.user.id,
            outsider: req.body.outsider,
            message: req.body.message, //para un futuro poder añadir mns personalizado
            destiny: {
                name: outsiderDestiny.name,
                img: outsiderDestiny.images,
                placeId: outsiderDestiny.placeId,
                location: {
                    coordinates: Object.values(outsiderDestiny.coordinates)
                }
            }
        })
        
        finalDestiny.save().then(data => { 
            User.findById(data.from)
            .then((user) => {
                const from = user;
                const to = data.outsider;
                if (from != to){
                    sendEmail.send(data, user, to);
                }
                res.json(data)
            })
            .catch(error => next(error));
        })
    })
    .catch(err => console.error(err)) 
}

module.exports.detail = (req, res, next) => {
    FuckOffs.findById(req.params.fuckOffId)
        .then(fuckOff => {
            if (!fuckOff) {
                throw createError(404, 'What that fuck are you doing?')
            } else {
                res.json(fuckOff);
            }
        })
        .catch(error => next(error))
}


module.exports.updateFav = (req, res, next) => {
    
    FuckOffs.findById(req.params.fuckOffId)
        .then(fuckOff => {
            if(!fuckOff){
                throw createError(404, 'fuckOff not found')
            } else {
                const newFav = !fuckOff.fav;

                fuckOff.set({ "fav": newFav });
                fuckOff.save()
                .then(() => {
                    res.json(fuckOff)
                })
                .catch(error => next(error));
            }
        })

        .catch(error => next(error));
}