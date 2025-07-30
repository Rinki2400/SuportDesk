const express = require("express");
const router = express.Router();
const {
  createOrLoginAdmin,
  getAlltickesAdmin,
  getAlltickesAdminById,
  deleteAlltickesAdminById,
} = require("../controller/AdminController");
const verifyAdmin = require('../middleware/verifyAdmin.js');

router.post("/", createOrLoginAdmin);
router.get("/tickets",verifyAdmin, getAlltickesAdmin);
router.get("/ticket/:id",verifyAdmin, getAlltickesAdminById);
router.delete("/ticket/:id", verifyAdmin,deleteAlltickesAdminById);

module.exports = router;
