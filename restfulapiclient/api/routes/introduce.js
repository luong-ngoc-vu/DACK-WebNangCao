const express = require('express');
const router = express.Router();

const controller = require('../controllers/introduce');

router.post('/create', controller.create);
router.put('/update', controller.update);
router.get('/get', controller.getCurrent);

module.exports = router;
