var express = require('express');
var router = express.Router({ mergeParams: true });
const fuckOffController = require('../controllers/fuck-off.controller');
const auth = require('../middlewares/auth.middleware');


router.get('/', auth.isAuthenticated, fuckOffController.list);
router.post('/', auth.isAuthenticated, fuckOffController.create);
router.get('/:fuckOffId', auth.isAuthenticated, fuckOffController.detail);
router.post('/:fuckOffId', auth.isAuthenticated, fuckOffController.updateFav);

module.exports = router;



