const express = require("express");
const router = express.Router();
const {
  createOrLoginAdmin,
  getAlltickesAdmin,
  updateTicketByAdmin,
  deleteAlltickesAdminById,
  getDashboardStats
} = require("../controller/AdminController");
const verifyAdmin = require('../middleware/verifyAdmin.js');

router.post("/", createOrLoginAdmin);
router.get("/admintickets",verifyAdmin, getAlltickesAdmin);
router.put("/adminticket/:id",verifyAdmin, updateTicketByAdmin);
router.delete("/adminticket/:id", verifyAdmin,deleteAlltickesAdminById);
router.get("/dashboard",verifyAdmin, getDashboardStats);

module.exports = router;
