const express = require('express');
const router = express.Router();

const SellerCtrl = require('../controllers/seller-ctrl');

router.post('/register', SellerCtrl.createAccount)
router.post('/login', SellerCtrl.authenticate)

module.exports = router;