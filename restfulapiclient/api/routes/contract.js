const express = require('express');
const router = express.Router();

const controller = require('../controllers/contract');

router.post('/addNewContract', controller.addNewContract);

module.exports = router;
