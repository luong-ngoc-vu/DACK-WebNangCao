const express = require('express');
const router = express.Router();

const controller = require('../controllers/introduce');

router.post('/create', controller.create);
router.put('/update', controller.update);
router.get('/:id', controller.getCurrent);

module.exports = router;
