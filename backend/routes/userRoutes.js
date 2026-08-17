const express = require("express");
const router = express.Router();
const { getUsers, createUser, updateUserRole, updateUser, deleteUser } = require("../controllers/userController");
const protect = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", protect, admin, getUsers);
router.post("/", protect, admin, createUser);
router.put("/:id/role", protect, admin, updateUserRole);
router.put("/:id", protect, admin, updateUser);
router.delete("/:id", protect, admin, deleteUser);

module.exports = router;
