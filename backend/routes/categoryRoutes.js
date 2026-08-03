const express = require("express");
const router = express.Router();
const {
  getCategories,
  getOccasions,
  createCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const protect = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", getCategories);
router.post("/", protect, admin, createCategory);
router.delete("/:id", protect, admin, deleteCategory);
router.get("/occasions", getOccasions);

module.exports = router;
