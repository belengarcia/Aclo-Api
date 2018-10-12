const mongoose = require('mongoose');
//esto va a Fuck off como objeto anidado
// transformar las coordenadas en el JSON
const destinySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: String,
    description: String,
    location:{
        type: {
            type: String,
            enum: ['Point'],
            required: true

        }, 
        coordinates: {
            type: [Number],
            required: true
        }
    }
}, {timestamps: true,     
    toJSON: {
    transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret;
        }   
    }   
});

const Destiny = mongoose.model('Destiny', destinySchema);
module.exports = Destiny;