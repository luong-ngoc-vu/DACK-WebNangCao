
const skillController = require('../controllers/skillController');
const express = require('express');
const router = express.Router();
const authorize = require('../../_helpers/jwt');
const Role = require('../../_helpers/roles');


router.post('/create', authorize(), skillController.create);
router.get('/all', skillController.getAll);
router.put('/:id', authorize(), skillController.update);
router.get('/:id', skillController.getById);
router.delete('/:id', authorize(Role.RootAdmin), skillController._delete);

module.exports = router;
