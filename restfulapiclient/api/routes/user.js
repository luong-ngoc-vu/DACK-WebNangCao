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
router.post('/getTutorialCity', controller.getTeacherCity);
router.post('/detailTutor', controller.getDetailTeacher);

router.get('/me', controller.getUser);

module.exports = router;
