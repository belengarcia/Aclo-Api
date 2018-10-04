var express = require('express');
var router = express.Router();
const userController = require('../controllers/users.controller')

router.get('/', userController.list);
router.post('/', userController.create);
router.delete('/:id', userController.delete);

module.exports = router;
