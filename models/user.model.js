const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'User Name is required'
    },
    mail: {
        type: String,
        required: 'email is required',
        unique: true
    },
    password: {
        type: String,
        required: 'Password is mandatory'
    },
    profilePic: {
        type: String
    },
    runAways: Number,
    personalHate: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {timestamps: true,     
    toJSON: {
    transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
        }   
    }   
});