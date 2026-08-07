const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth");
const admin = require("../middleware/admin");

const {
  dashboard,
} = require("../controllers/adminController");

router.get(
  "/dashboard",
  protect,
  admin,
  dashboard
);

module.exports = router;