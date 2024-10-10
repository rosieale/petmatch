const express = require("express");
const router = express.Router();
const Pet = require("../models/Pet"); // Importa el modelo Pet
const {
  getPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
  markAdoptionAsCompleted,
  uploadAdoptionImage,
  rateAdoption,
} = require("../controllers/petController");
const {
  uploadMultiple,
  uploadToS3,
} = require("../middlewares/uploadMiddleware");
const { protect } = require("../middlewares/authMiddleware");

router.get("/search", async (req, res) => {
  const { q, page = 1, type, location } = req.query;
  const limit = 10;
  const skip = (page - 1) * limit;

  const query = {
    $or: [
      { name: { $regex: q || "", $options: "i" } },
      { location: { $regex: q || "", $options: "i" } },
      { type: { $regex: q || "", $options: "i" } },
    ],
  };

  if (type) {
    query.type = { $regex: type, $options: "i" };
  }
  if (location) {
    query.location = { $regex: location, $options: "i" };
  }

  try {
    const pets = await Pet.find(query).skip(skip).limit(limit);
    const totalPets = await Pet.countDocuments(query);
    const totalPages = Math.ceil(totalPets / limit);
    res.json({ pets, totalPages, currentPage: page });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", getPets);
router.post("/", protect, uploadMultiple, createPet);
router.get("/:id", getPetById);
router.put("/edit/:id", protect, uploadMultiple, updatePet);
router.delete("/:id", protect, deletePet);
router.put("/:id/complete", protect, markAdoptionAsCompleted);
router.post(
  "/:id/upload-adoption-image",
  protect,
  uploadMultiple,
  uploadAdoptionImage
);
router.post("/:id/rate-adoption", protect, rateAdoption);

module.exports = router;
