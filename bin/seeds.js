const mongoose = require('mongoose');
require('../configs/db.configs');

const User = require('../models/user.model');


let admin = [{
    name : 'Super Admin',
    profilePic: 'https://vignette.wikia.nocookie.net/gameofthrones/images/c/c3/Profile-CerseiLannister.png/revision/latest?cb=20170828071355',
    mail: 'super.admin@examples.org',
    password: '12345678',
    role: 'admin' 
}]

User.create(admin)
    .then((result) => {
        console.log('Admin created')
    })
    .catch((err) => {
        console.log(err);
    })