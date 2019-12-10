const express = require('express');
const router = express.Router();

const controller = require('../controllers/RootAdmin');
const controllerLogin = require('../controllers/admin');

router.post('/createAdmin', controller.createAdmin);
router.get('/getAllAdmin', controller.getAdmin);

module.exports = router;
