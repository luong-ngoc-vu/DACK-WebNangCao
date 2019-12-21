const express = require('express');
const router = express.Router();

const controller = require('../controllers/message');

router.patch('/create', controller.markRead);
router.get('/id', controller.getById);

router.get('/getAll/:from/:to/:limit', controller.getAll);

module.exports = router;
