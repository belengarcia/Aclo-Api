const express = require('express');
const router = express.Router();
const sessionsController = require('../controllers/sessions.controllers');

router.post('/', sessionsController.create);
router.delete('/', sessionsController.delete)

module.exports = router;