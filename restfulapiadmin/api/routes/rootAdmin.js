const express = require('express');
const router = express.Router();

const controller = require('../controllers/admin');

router.post('/createAdmin', controller.createAdmin);

module.exports = router;
