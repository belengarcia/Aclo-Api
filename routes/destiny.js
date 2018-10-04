const express = require('express');
const router = express.Router();
const destinyController = require('../controllers/destiny.controller');
const auth = require('../middlewares/auth.middleware');

router.get('/', auth.isAuthenticated, destinyController.list); 
router.post('/', auth.isAuthenticated, destinyController.create); 
router.get('/:id', auth.isAuthenticated, destinyController.get); 
router.delete('/:id', auth.isAuthenticated, destinyController.delete) 

module.exports = router;