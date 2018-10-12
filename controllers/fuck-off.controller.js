const fuckOffs = require('../models/fuck-off.model');
const mongoose = require('mongoose');
const createError = require('http-errors');

module.exports.list = (req, res, next) => {
    fuckOffs.find( { $or: [
            { from : req.params.id },
            { to : req.params.id }
        ]})
        .then(data => {
            res.json(data)
        })
        .catch(error => next(error))
}



// module.exports.create = (req, res, next) => {
//     const cords = [Math.random(), Math.random()];
//     googleApi.destiny(cords)
//         .then(destiny => {
//             const newData = new fuckOffs({
//                 from: req.user.id,
//                 to: req.params.id,
//                 message: req.body.message,
//                 destiny: destiny
//             })
//             return newData.save()
//                 .then(data => res.status(201).json(data))
//         .catch(error => next(error));
// }

//aqui creo el random
//paso el random con el api y el api de google y lo transformo a mi model de destiny

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

