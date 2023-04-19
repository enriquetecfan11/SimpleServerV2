const express = require('express');
const ApiController = require('../controllers/controller.js');
const router = express.Router();

router.post('/miniestacion', ApiController.postMiniEstacion);
router.get('/miniestacion', ApiController.getMiniEstacion);

module.exports = router;
