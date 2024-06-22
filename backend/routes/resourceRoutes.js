const express = require("express");
const router = express.Router();
const {
  createResource,
  updateResource,
  deleteResource,
  getResource,
  getResources,
} = require("../controllers/resourceController");
const {
  protect,
  isResourceOwner,
  admin,
} = require("../middlewares/authMiddleware");
const { upload } = require("../middlewares/uploadMiddleware");

router
  .route("/")
  .get(getResources)
  .post(protect, upload.single("image"), createResource);

router
  .route("/:id")
  .get(getResource)
  .put(protect, isResourceOwner, upload.single("image"), updateResource)
  .delete(protect, isResourceOwner, deleteResource);

module.exports = router;
