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

router.get('/getUserId/:id', controller.getUserId);
router.get('/teachers', controller.getTeachers);
router.get('/students', controller.getStudents);
router.get('/getUserByName/:name', controller.getUserByName);
router.get('/getSkillByName/:name', controller.getSkillByName);
router.get('/getASkillByName/:name', controller.getASkillByName);
router.put('/createSkillV2', controller.createSkillV2);
router.post('/createSkillV3', controller.createSkillV3);

module.exports = router;
