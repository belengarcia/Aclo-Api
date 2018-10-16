const FuckOffs = require('../models/fuck-off.model');
const destiny = require('../models/destiny.model');
const mongoose = require('mongoose');
const createError = require('http-errors');
const googleApi = require('../services/google-api')
const axios = require('axios')

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

// module.exports.updateFav = (req, res, next) => {
    
//     changes = {
//         fav: true
//     }
//     FuckOffs.findByIdAndUpdate(req.params.fuckOffId, {$set: changes}, {new: true, runValidators: true})
//         .then(fuckOff => {
//             if (!fuckOff) {
//                 throw createError(404, 'I dont know what you are looking for')
//             } else {
//                 res.json(fuckOff).status(201);
//             }
//         })
//         .catch(error => next(error))
// }

module.exports.updateFav = (req, res, next) => {
    
    FuckOffs.findById(req.params.fuckOffId)
        .then(fuckOff => {
            if(!fuckOff){
                throw createError(404, 'fuckOff not found')
            } else {
                console.log('Old fav:', fuckOff.fav)
                const newFav = !fuckOff.fav;
                console.log('New fav:', newFav)

                fuckOff.set({ "fav": newFav });
                fuckOff.save()
                .then(() => {
                    console.log('f-o:', fuckOff)
                    res.json(fuckOff)
                })
                .catch(error => next(error));
            }
        })

        .catch(error => next(error));
}

    // FuckOffs.findById(req.params.fuckOffId)
    //     .then(fuckOff => {
    //         if(!fuckOff) {
    //             
    //         } else {
    //             if(fuckOff.fav === false){
    //                 changes = {
    //                     fav: true
    //                 }
    //                 fuckOff.update(req.params.fuckOffid, {$set : changes}, { new: true, runValidators: true })
    //                     .then(res.json(fuckOff))
    //                     .catch(error => next (error));
    //             } else {
    //                 changes = {
    //                     fav: false
    //                 }
    //                 fuckOff.update(req.params.fuckOffid, {$set : changes}, { new: true, runValidators: true })
    //                 .then(res.json(fuckOff))
    //                 .catch(error => next (error));
    //             }
    //         }
    //     })
    //     .catch(error => next(error))