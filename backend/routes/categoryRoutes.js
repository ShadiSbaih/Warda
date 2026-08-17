const express = require("express");
const router = express.Router();
const {
  getCategories,
  getOccasions,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const protect = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", getCategories);
router.post("/", protect, admin, createCategory);
router.put("/:id", protect, admin, updateCategory);
router.delete("/:id", protect, admin, deleteCategory);
router.get("/occasions", getOccasions);

module.exports = router;
