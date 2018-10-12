var express = require('express');
var router = express.Router();
const userController = require('../controllers/users.controller');
// const userDestController = require('../controllers/userDestiny.controller');
const auth = require('../middlewares/auth.middleware');
const constants = require('../constants');

router.post('/', userController.create);
router.get('/', auth.isAuthenticated, userController.list);   //todos
router.get('/:id', auth.isAuthenticated, userController.get)
router.delete('/:id', auth.isAuthenticated, auth.checkRole(constants.ROLE_ADMIN), userController.delete); //solo admin
router.put('/:id/update', auth.isAuthenticated, auth.meOrAdmin, userController.update) //me or admin


// Arreglar porque ahora depende de fuckoffs!!
// router.get('/:id/myDestinies', auth.isAuthenticated, userDestController.list); 
// router.post('/:id/myDestinies', auth.isAuthenticated, userDestController.create);
// router.delete('/:id/myDestinies/:id_userDestiny', auth.isAuthenticated, auth.isMe('id'), userDestController.delete) 

module.exports = router;



