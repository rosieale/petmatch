const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  getUserAdoptions,
  verifyUser,
  getVerificationApplications,
  confirmVerification,
} = require("../controllers/userController");
const { protect, admin } = require("../middlewares/authMiddleware");
const { uploadMultiple } = require("../middlewares/uploadMiddleware");

// Rutas estáticas
router.post("/register", uploadMultiple, registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.patch("/profile", protect, uploadMultiple, updateUserProfile);
router.get("/", protect, getUsers);
router.get(
  "/verification-applications",
  protect,
  admin,
  getVerificationApplications
);
router.post(
  "/confirm-verification/:userId",
  protect,
  admin,
  confirmVerification
);
router.get("/verify/:userId", protect, admin, verifyUser);

// Rutas dinámicas
router.get("/:id", protect, getUser);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);
router.get("/:id/adoptions", protect, getUserAdoptions);

module.exports = router;
