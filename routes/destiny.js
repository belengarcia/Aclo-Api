const express = require('express');
const router = express.Router();
const destinyController = require('../controllers/destiny.controller');
const auth = require('../middlewares/auth.middleware');
const constants = require('../constants');

router.get('/', auth.isAuthenticated, auth.checkRole(constants.ROLE_ADMIN), destinyController.list); 
router.post('/', auth.isAuthenticated, destinyController.create); 
router.get('/:id', auth.isAuthenticated, destinyController.get); 
router.delete('/:id', auth.isAuthenticated, auth.checkRole(constants.ROLE_ADMIN), destinyController.delete); 
router.put('/:id/update', auth.isAuthenticated, auth.checkRole(constants.ROLE_ADMIN), destinyController.update);

module.exports = router;