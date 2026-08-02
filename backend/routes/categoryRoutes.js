const express = require("express");

const router = express.Router();

const {
  getCategories,
  getOccasions,
} = require("../controllers/categoryController");

router.get("/", getCategories);
router.get("/occasions", getOccasions);

module.exports = router;
