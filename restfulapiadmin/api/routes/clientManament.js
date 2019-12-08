const clientCtrl = require('../controllers/clientManagement');
const authorize = require('../../_helpers/jwt');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/all', authorize(), clientCtrl.getAllClient);
router.get('/:email', authorize(), clientCtrl.getAClient);


module.exports = router;