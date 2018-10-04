var express = require('express');
var router = express.Router();
const userController = require('../controllers/users.controller');
const userDestController = require('../controllers/userDestiny.controller');

router.get('/', userController.list); //registrado    //solo admin
router.post('/', userController.create);
router.delete('/:id', userController.delete); //regsitrado //solo admin

router.get('/:id/myDestinies', userDestController.list); //registrado //solo user (y admin?)
router.post('/:id/myDestinies', userDestController.create); //registrado //solo user (y admin?)

module.exports = router;
