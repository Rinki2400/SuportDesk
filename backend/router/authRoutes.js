const express = require('express');
const router = express.Router();
const { register, login, createOrLoginAdmin } = require('../controller/authController');

router.post('/register', register);
router.post('/login', login);

router.post('/admin', createOrLoginAdmin);


module.exports = router;
