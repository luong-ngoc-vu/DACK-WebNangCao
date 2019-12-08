
const authController = require('../controllers/authController');
const express = require('express');
const router = express.Router();
const authorize = require('../../_helpers/jwt');
const Role = require('../../_helpers/roles');
/* GET home page. */
router.post('/authenticate', authController.authenticate);     // public route
router.post('/create', authorize(Role.RootAdmin), authController.create);// public route
router.get('/all', authorize(Role.RootAdmin), authController.getAll);
router.put('/:id', authorize(), authController.update);
router.get('/:id', authorize(Role.RootAdmin), authController.getById);
router.delete('/:id', authorize(Role.RootAdmin), authController._delete);
router.get('/', authorize(), authController.getCurrent);

module.exports = router;
