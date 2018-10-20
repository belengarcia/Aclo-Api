const mongoose = require('mongoose');
require('../configs/db.configs');

const User = require('../models/user.model');


let users = [{
    name : 'Super Admin',
    profilePic: 'https://vignette.wikia.nocookie.net/gameofthrones/images/c/c3/Profile-CerseiLannister.png/revision/latest?cb=20170828071355',
    mail: 'super.admin@examples.org',
    password: '12345678',
    role: 'admin' 
}, {
    name: 'Daenerys Targaryen',
    profilePic: 'http://beta.ems.ladbiblegroup.com/s3/content/808x455/9190dae95b1d3eecc6019a6bd197e092.png',
    mail: 'daenerys@targaryen.com',
    password: '12345678',
    role: 'user'
}, {
    name: 'Jaime Lannister',
    profilePic: 'https://www.abc.es/media/play/2017/09/27/jaime-lannister-1024-kWAH--620x349@abc.jpg',
    mail: 'jaime@lannister.com',
    password: '12345678',
    role: 'user'
}, {
    name: 'Cersei Lannister',
    profilePic: 'https://www.telegraph.co.uk/content/dam/tv/2016/06/29/cersei2_trans_NvBQzQNjv4Bq8uCZQ4CwV1dl0Mg8NuwggWSDtfxxgc3CJ64yW7BKTEs.jpg?imwidth=450',
    mail: 'cersei@lannister.com',
    password: '12345678',
    role: 'user'
}, {
    name: 'Jon Snow',
    profilePic: 'https://pbs.twimg.com/profile_images/901947348699545601/hqRMHITj_400x400.jpg',
    mail: 'jon@snow.com',
    password: '12345678',
    role: 'user'
}, {
    name: 'Arya Stark',
    profilePic: 'https://pbs.twimg.com/profile_images/894833370299084800/dXWuVSIb_400x400.jpg',
    mail: 'arya@stark.com',
    password: '12345678',
    role: 'user'
}, {
    name: 'Renly Baratheon',
    profilePic: 'https://vignette.wikia.nocookie.net/gameofthrones/images/f/ff/Profile-Renly_Baratheon.png/revision/latest?cb=20171006064500',
    mail: 'renly@baratheon.com',
    password: '12345678',
    role: 'user'
}, {
    name: 'Ramsay Bolton',
    profilePic: 'https://static.comicvine.com/uploads/original/11131/111316720/5896107-4219618203-51812.png',
    mail: 'ramsay@bolton.com',
    password: '12345678',
    role: 'user'
}, {
    name: 'Sansa Stark',
    profilePic: 'https://img.europapress.es/fotoweb/fotonoticia_20180307162430_640.jpg',
    mail: 'sansa@stark.com',
    password: '12345678',
    role: 'user' 
} ]


User.create(users)
    .then((result) => {
        console.log('Admin created')
    })
    .catch((err) => {
        console.log(err);
    })