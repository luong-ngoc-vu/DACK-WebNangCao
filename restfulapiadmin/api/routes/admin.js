const express = require('express');
const router = express.Router();

const controller = require('../controllers/admin');

router.post('/login', controller.authLogin);
router.get('/users', controller.getUsers);
router.post('/user', controller.getUser);

module.exports = router;
