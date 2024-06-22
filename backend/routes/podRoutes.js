const express = require("express");
const router = express.Router();
const {
  addToPod,
  getPod,
  removeFromPod,
} = require("../controllers/podController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/add", protect, addToPod);
router.get("/", protect, getPod); // Asegúrate de que esta ruta es correcta y coincide con la solicitud
router.post("/remove", protect, removeFromPod);

module.exports = router;
