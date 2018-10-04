var express = require('express');
var router = express.Router();
const userController = require('../controllers/users.controller');
const userDestController = require('../controllers/userDestiny.controller');
const auth = require('../middlewares/auth.middleware');

router.get('/', auth.isAuthenticated, userController.list);   //solo admin
router.post('/', auth.isAuthenticated, userController.create);
router.delete('/:id', auth.isAuthenticated, userController.delete); //solo admin

router.get('/:id/myDestinies', auth.isAuthenticated, userDestController.list); //solo user (y admin?)
router.post('/:id/myDestinies', auth.isAuthenticated, userDestController.create);  //solo user (y admin?)

module.exports = router;
