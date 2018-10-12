const fuckOffs = require('../models/fuck-off.model');
const destiny = require('../models/destiny.model');
const mongoose = require('mongoose');
const createError = require('http-errors');
const googleApi = require('../googleApi')
const address = require('../googleApi')

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

module.exports.create = (req, res, next) => {

    address;
    console.log(address);

    const destinyData = new destiny({
        //aquí la información que cogí del api de Google
    })
}

    // destinyData.save()
    //     .then(
    //         destiny => {
    //             res.status(201).json(destiny)
    //             const newData = new fuckOffs({
    //                 from: req.user.id,
    //                 to: req.params.id,
    //                 message: req.body.message,
    //                 destiny: destiny.id
    //             })
    //             newData.save()
    //                 .then(data => res.status(201).json(data))
    //                 .catch(error => next(error)); //me hace falta este catch?
    //         }
    //     )
    //     .catch(error => next(error));
