const express = require('express');
const router = express.Router();
const controller = require('../controllers/vulnerabilities.controller');

router.get('/', controller.getVulnerabilities);
router.post('/', controller.createVulnerability);
router.delete('/:id', controller.deleteVulnerability);

module.exports = router;