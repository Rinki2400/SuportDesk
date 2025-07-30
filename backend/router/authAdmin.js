const express = require('express');
const router = express.Router();
const { createOrLoginAdmin } = require('../controller/AdminController');

router.post('/admin', createOrLoginAdmin);


module.exports = router;
