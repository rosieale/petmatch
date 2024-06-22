const express = require("express");
const router = express.Router();
const {
  getUserAdoptions,
  getAllAdoptions,
  createAdoption,
} = require("../controllers/adoptionController");
const { protect, admin } = require("../middlewares/authMiddleware");

router.get("/user/:userId", protect, getUserAdoptions);
router.get("/", protect, admin, getAllAdoptions);
router.post("/", protect, createAdoption);

module.exports = router;
