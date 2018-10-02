const express = require('express');
const router = express.Router();
const destinyController = require('../controllers/destiny.controller');

router.get('/', destinyController.list);
router.post('/', destinyController.create);
router.get('/:id', destinyController.get);
router.delete('/:id', destinyController.delete)

module.exports = router;