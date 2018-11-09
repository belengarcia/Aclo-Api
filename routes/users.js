var express = require('express');
var router = express.Router();
const userController = require('../controllers/users.controller');
const auth = require('../middlewares/auth.middleware');
const constants = require('../constants');

router.post('/', userController.create);
router.get('/', auth.isAuthenticated, userController.list);   
router.get('/hated', auth.isAuthenticated, userController.hatedList);   
router.get('/:id', auth.isAuthenticated, userController.get)
router.delete('/:id', auth.isAuthenticated, auth.checkRole(constants.ROLE_ADMIN), userController.delete);  
router.put('/:id/update', auth.isAuthenticated, auth.meOrAdmin, userController.update) 

module.exports = router;



