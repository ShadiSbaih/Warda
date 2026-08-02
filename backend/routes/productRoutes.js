const express = require("express");

const router = express.Router();

const {
  getProducts,
  getShopProducts,
  getCategoryProducts,
  getProduct,
} = require("../controllers/productController");

router.get("/", getProducts);

router.get(
  "/shop/:shopId",
  getShopProducts
);

router.get(
  "/category/:category",
  getCategoryProducts
);

router.get("/:id", getProduct);

module.exports = router;