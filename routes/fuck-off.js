var express = require('express');
var router = express.Router({ mergeParams: true });
const fuckOffController = require('../controllers/fuck-off.controller');
const auth = require('../middlewares/auth.middleware');


router.get('/', auth.isAuthenticated, fuckOffController.list)
// router.get('/to', auth.isAuthenticated, fuckOffController.listTo)
router.post('/', auth.isAuthenticated, fuckOffController.create);
router.get('/:fuckOffId', auth.isAuthenticated, fuckOffController.detail);

module.exports = router;



