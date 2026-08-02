const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth");

const {
  addReview,
  getShopReviews,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

router.post("/", protect, addReview);

router.get(
  "/:shopId",
  getShopReviews
);

router.put("/:id", protect, updateReview);

router.delete(
  "/:id",
  protect,
  deleteReview
);

module.exports = router;