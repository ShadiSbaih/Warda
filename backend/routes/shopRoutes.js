const express = require("express");

const router = express.Router();

const {
  getShops,
  getShop,
  getFeaturedShops,
  getPopularShops,
} = require("../controllers/shopController");

router.get("/", getShops);

router.get("/featured", getFeaturedShops);

router.get("/popular", getPopularShops);

router.get("/:id", getShop);

module.exports = router;