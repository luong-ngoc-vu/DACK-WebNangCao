const express = require('express');
const router = express.Router();

const controller = require('../controllers/user');
const controllerLogin = require('../controllers/auth');

router.post('/register', controller.register);
router.post('/login', controllerLogin.authLogin);
router.post('/update', controller.updateUser);
router.post('/changePass', controller.changePassword);
router.post('/getTutorialCity', controller.getTeacherCity);

router.get('/getTutorialUser', controller.getTeacher);
router.get('/detailTutor/:id', controller.getDetailTeacher);
router.get('/getSkills', controller.getSkills);
router.post('/getTeachesrBySkill', controller.getTeachersBySkill);

router.get('/me', controller.getUser);

module.exports = router;
