var express = require('express');
var router = express.Router({ mergeParams: true });
const statsController = require('../controllers/stats.controller');
const auth = require('../middlewares/auth.middleware');

router.get('/', auth.isAuthenticated, statsController.ranking)

module.exports = router;