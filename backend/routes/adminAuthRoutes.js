const express = require("express");
const { body, param } = require("express-validator");

const router = express.Router();

const protect = require("../middleware/auth");
const admin = require("../middleware/admin");
const handleValidationErrors = require("../middleware/validate");

const {
    getUsers,
    updateUserRole,
} = require("../controllers/adminAuthController");

const updateRoleValidators = [
  param("id").isMongoId().withMessage("Invalid user id"),
  body("role").isIn(["user", "admin", "delivery"]).withMessage("Invalid role"),
];

router.get(
    "/users",
    protect,
    admin,
    getUsers
);

router.put(
    "/users/:id/role",
    protect,
    admin,
    updateRoleValidators,
    handleValidationErrors,
    updateUserRole
);

module.exports = router;
