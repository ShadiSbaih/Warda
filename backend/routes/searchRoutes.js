const express = require("express");

const router = express.Router();

const {
  search,
  searchShops,
  searchProducts,
} = require("../controllers/searchController");

router.get("/", search);

router.get(
  "/shops",
  searchShops
);

router.get(
  "/products",
  searchProducts
);

module.exports = router;