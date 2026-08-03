const express = require("express");

const router = express.Router();

const {
  getProducts,
  getShopProducts,
  getCategoryProducts,
  getProduct,
  createProduct,
  deleteProduct,
} = require("../controllers/productController");

const protect = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", getProducts);
router.post("/", protect, admin, createProduct);

router.get(
  "/shop/:shopId",
  getShopProducts
);

router.get(
  "/category/:category",
  getCategoryProducts
);

router.get("/:id", getProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;