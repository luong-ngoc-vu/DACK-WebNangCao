const express = require('express');
const router = express.Router();
const User = require('../models/user');
const ObjectId = require('mongodb').ObjectID;

const controller = require('../controllers/user');
const controllerLogin = require('../controllers/auth');

router.post('/register', controller.register);
router.post('/login', controllerLogin.authLogin);
router.post('/update', controller.updateUser);
router.post('/changePass', controller.changePassword);

router.get('/getTutorialUser', controller.getTeacher);
router.post('/getTutorialCity', controller.getTeacherCity);

router.get('/detailTutor/:id', controller.getDetailTeacher);

router.get('/getSkills', controller.getSkills);

router.get('/me', controller.getUser);

module.exports = router;
