const express = require('express');
const router = express.Router();

const controller = require('../controllers/admin');

router.post('/login', controller.authLogin);
router.get('/users', controller.getUsers);
router.post('/user', controller.getUser);

router.post('/createSkill', controller.createSkill);
router.get('/skills', controller.getSkills);
router.post('/skill', controller.getSkill);
router.post('/updateSkill', controller.updateSkill);
router.post('/deleteSkill', controller.deleteSkill);
router.post('/lockAccount', controller.lockAccount);
router.post('/getUserByEmail', controller.getUserByEmail);

router.get('/teachers', controller.getTeachers);
router.get('/students', controller.getStudents);
router.post('/getUserByName', controller.getUserByName);
router.post('/getSkillByName', controller.getSkillByName);

module.exports = router;
