const express = require('express');
const router = express.Router();

const controller = require('../controllers/message');

router.put('/markRead/:id', controller.markRead);
router.get('/:id', controller.getById);

router.get('/getAll/:from/:to/:limit', controller.getAll);
router.get('/getUnread/:to', controller.getUnreadMessage);

module.exports = router;
