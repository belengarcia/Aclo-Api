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
            //this if can be done cleaner FOR SURE
            if (req.body.to){
                console.log('IN en req.body')
                finalDestiny = new FuckOffs({
                    from: req.user.id,
                    to: req.body.to,
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
                console.log('FUCKOFF: ', finalDestiny);
            } else {
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
            }

            finalDestiny.save().then(data => {
                if(typeof data.to !== Object){
                    console.log('entra en string')
                    User.findById(data.from)
                    .then((user)=> {
                        const from = user.mail;
                        const to = data.to;
                        console.log('email service, FROM: ', to)
                        if (from.mail != to){
                            sendEmail.send(data, from, to);
                        }
                        res.json(data)
                    })
                    .catch(error => next(error));
                } else {
                    console.log('entra en ID')
                    Promise.all([
                        User.findById(data.from),
                        User.findById(data.to)
                    ]).then((values) => {
                        const from = values[0];
                        const to = values[1];
                        console.log('email service, FROM: ', from)
                        if (from.mail != to.mail){
                            sendEmail.send(data, from, to);
                        }
                        res.json(data)
                    })
                    .catch(error => next(error));
                }
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