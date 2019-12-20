const express = require('express');
const router = express.Router();

const controller = require('../controllers/contract');

router.post('/addNewContract', controller.addNewContract);
router.get('/getListContractByIdStudent/:idStudent', controller.getListContractByIdStudent)
router.get('/getListContractByIdTeacher/:idTeacher', controller.getListContractByIdTeacher)
module.exports = router;
