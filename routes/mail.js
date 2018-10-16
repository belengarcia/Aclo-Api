var express = require('express');
var router = express.Router({ mergeParams: true });
const mailController = require('../controllers/mail.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/', auth.isAuthenticated, mailController.send);