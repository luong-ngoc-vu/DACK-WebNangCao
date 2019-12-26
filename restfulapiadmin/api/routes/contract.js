const express = require('express');
const router = express.Router();

const controller = require('../controllers/contract');

router.get('/getListContractByIdStudent/:idStudent', controller.getListContractByIdStudent);
router.get('/getListContractByIdTeacher/:idTeacher', controller.getListContractByIdTeacher);
router.put('/changeStatus/:idContract/:status', controller.changeStatus);

router.get('/contracts', controller.getAllContract);
router.get('/contractByStatus/:status', controller.getContractByStatus);
router.get('/contractByIdContract/:idContract', controller.getContractByIdContract);


router.get('/thongKeDoanhThuAllTutorByMonth/:year', controller.thongKeDoanhThuAllTutorByMonth);
router.get('/thongKeDoanhThuAllTutorByYear', controller.thongKeDoanhThuAllTutorByYear);
router.get('/thongKeDoanhThuAllTutorByQuarter/:year', controller.thongKeDoanhThuAllTutorByQuarter);

router.get('/getListTutorAndRevenue', controller.getListTutorAndRevenue);

router.get('/getListTutorAndRevenueByMonth/:year/:month', controller.getListTutorAndRevenueByMonth);
router.get('/getListTutorAndRevenueQuarter/:year/:quater', controller.getListTutorAndRevenueQuarter);
router.get('/getListTutorAndRevenuCurrentWeek', controller.getListTutorAndRevenuCurrentWeek);

router.get('/getAllNumberForDashboard', controller.getAllNumberForDashboard);

module.exports = router;
