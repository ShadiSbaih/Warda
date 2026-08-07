const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const {
  register,
  login,
  profile,
} = require("../controllers/authController");

const protect = require("../middleware/auth");
const handleValidationErrors = require("../middleware/validate");

const registerValidators = [
  body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 100 }).withMessage("Name too long"),
  body("email").trim().notEmpty().withMessage("Email is required").isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("phone").optional({ nullable: true }).trim().isMobilePhone().withMessage("Valid phone number is required"),
];

const loginValidators = [
  body("email").trim().notEmpty().withMessage("Email is required").isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

router.post("/register", registerValidators, handleValidationErrors, register);
router.post("/login", loginValidators, handleValidationErrors, login);
router.get("/profile", protect, profile);

module.exports = router;
