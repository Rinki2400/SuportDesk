const express = require('express');
const router = express.Router();
const { register, login, createOrLoginAdmin } = require('../controller/authController');

router.post('/register', register);
router.post('/login', login);

router.get('/admin/setup', createOrLoginAdmin);


module.exports = router;
