const express = require('express');
const router = express.Router();

const controller = require('../controllers/contract');

router.post('/addNewContract', controller.addNewContract);
router.get('/getListContractByIdStudent/:idStudent', controller.getListContractByIdStudent);
router.get('/getListContractByIdTeacher/:idTeacher', controller.getListContractByIdTeacher);
router.put('/changeStatusAndUpdateMoney/:idContract/:status/:idStudent/:idTeacher', controller.changeStatusAndUpdateMoney);
router.put('/changeStatus/:idContract/:status', controller.changeStatus);
router.get('/checkContractHiring/:idStudent/:idTeacher', controller.checkContractPendingHiring);
router.get('/checkContractHired/:idStudent/:idTeacher', controller.checkContractHired);

router.put('/complaintFromStudent/:idContract/:idStudent/:noiDungKhieuNaiHS', controller.complaintFromStudent);
router.put('/complaintFromTeacher/:idContract/:idTeacher/:noiDungKhieuNaiGV', controller.complaintFromTeacher);
router.post('/addNewEvaluation', controller.addNewEvaluation);
router.get('/getListEvaluationByIdTeacher/:idTeacher', controller.getListEvaluationByIdTeacher);
router.get('/thongKeDoanhThuFromDateToData/:idTeacher', controller.thongKeDoanhThuFromDateToData);

module.exports = router;
