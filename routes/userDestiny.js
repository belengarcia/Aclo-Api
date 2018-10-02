const express = require('express');
const router = express.Router();
const userDestController = require('../controllers/userDestiny.controller');

router.get('/', userDestController.list);
router.post('/', userDestController.create);
router.get('/:id', userDestController.get);
router.delete('/:id', userDestController.delete);

module.exports = router;
