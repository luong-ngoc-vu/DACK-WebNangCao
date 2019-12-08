
const skillController = require('../controllers/skillController');
const express = require('express');
const router = express.Router();

router.post('/create', authorize(), skillController.create);// public route
router.get('/all', authorize(), skillController.getAll);
router.put('/:id', authorize(), skillController.update);
router.get('/:id', authorize(), skillController.getById);
router.delete('/:id', authorize(Role.RootAdmin), skillController._delete);

module.exports = router;
