const express = require('express');
const router = express.Router();
const passport = require('passport');

const controller = require('../controllers/user');
const controllerLogin = require('../controllers/auth');

router.post('/register', controller.register);
router.post('/login', controllerLogin.authLogin);
router.post('/update', controller.updateUser);
router.post('/changePass', controller.changePassword);
router.get('/getTutorialUser', controller.getTeacher);
router.get('/getTutorialCity', controller.getTeacherCity);

router.get('/me', controller.getUser);

module.exports = router;
