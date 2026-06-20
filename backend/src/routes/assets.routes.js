const express = require('express');
const router = express.Router();
const controller = require('../controllers/assets.controller');

router.get('/', controller.getAssets);
router.post('/', controller.createAsset);
router.put('/:id', controller.updateAsset);
router.delete('/:id', controller.deleteAsset);

module.exports = router;