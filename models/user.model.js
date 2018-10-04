const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10;

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

userSchema.pre('save', function save(next){
    const user = this;
    if(!user.isModified('password')) {
        next();
    } else {
        bcrypt.genSalt(SALT_WORK_FACTOR)
            .then(salt => {
                return bcrypt.hash(user.password, salt)
            })
            .then(hash => {
                user.password = hash;
                next();
            })
            .catch(error => next(error));
    }
});

userSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = User;