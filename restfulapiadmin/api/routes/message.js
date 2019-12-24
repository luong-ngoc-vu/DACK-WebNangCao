const express = require('express');
const router = express.Router();

const controller = require('../controllers/message');


router.get('/getAll/:from/:to/:limit', controller.getAll);


module.exports = router;
