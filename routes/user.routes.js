import express from "express";
import {
  loginUser,
  registerUser,
} from "../controllers/auth.controller.js";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controllers/user.controller.js";
import authMiddleware from "../Middleware/auth.js"; // Import your authentication middleware here

const router = express.Router();

// Authentication routes
router.post("/register", registerUser); // Registration route
router.post("/login", loginUser); // Login route

// User management routes (consider protecting these)
router.use(authMiddleware); // Protect all user management routes
router.get("/", getAllUsers); // Get all users
router.get("/:id", getUserById); // Get user by ID
router.put("/:id", updateUserById); // Update user by ID
router.delete("/:id", deleteUserById); // Delete user by ID

export default router;
