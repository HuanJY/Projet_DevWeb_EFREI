const express = require('express');
const router = express.Router();
const controller = require('../controllers/risk.controller');

router.post('/calculate', controller.calculateRisk);

module.exports = router;