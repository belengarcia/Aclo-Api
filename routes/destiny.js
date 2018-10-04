const express = require('express');
const router = express.Router();
const destinyController = require('../controllers/destiny.controller');

router.get('/', destinyController.list); // registrado
router.post('/', destinyController.create); // registrado
router.get('/:id', destinyController.get); // registrado
router.delete('/:id', destinyController.delete) //registrado

module.exports = router;