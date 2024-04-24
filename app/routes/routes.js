const express = require('express');
const ApiController = require('../controllers/controller.js');
const router = express.Router();

router.post('/miniestacion', ApiController.postMiniEstacion);
router.get('/miniestacion', ApiController.getMiniEstacion);

router.post('/createsensor', ApiController.createSensor);
router.get('/sensor', ApiController.getSensor);

router.post('/miniestacionid', ApiController.miniestacionID);

router.post('/rawdata', ApiController.rawData);

module.exports = router;
