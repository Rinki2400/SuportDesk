const express = require('express');
const router = express.Router();
const {createTicket,getAllTicket,getTicketById} = require('../controller/ticketController');
const authMiddleware = require("../middleware/authMiddleware");

router.post('/',authMiddleware, createTicket);
router.get('/',authMiddleware, getAllTicket);
router.get('/:id',authMiddleware, getTicketById);



module.exports = router;
